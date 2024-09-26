import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dummyCourses } from "@/app/coursesData";
import { db } from "@/app/firebase/firebase-config"; // Import Firestore config
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore methods

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDZs8k3GizX_3pNv0KDj5lOTH9Q8dhMh1Q";

if (!apiKey) {
  console.error("GEMINI_API_KEY is not defined");
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

async function saveChatHistory(userId: string, courseId: string, chatHistory: any) {
  // Save chat history to Firestore using setDoc
  await setDoc(doc(db, "chatHistories", userId), {
    courseId,
    chatHistory,
    timestamp: new Date(),
  });
}

async function loadChatHistory(userId: string, courseId: string) {
  // Load chat history from Firestore using getDoc
  const chatHistoryDoc = await getDoc(doc(db, "chatHistories", userId));
  if (chatHistoryDoc.exists()) {
    return chatHistoryDoc.data()?.chatHistory || [];
  }
  return [];
}

export async function POST(req: Request) {
  try {
    console.log("POST request received at /api/evaluate");
    

    // Parse the request body
    const body = await req.json();
    console.log("Received request body:", body); 
    const {
      userId,
      question,
      answer,
      courseId,
      chatHistory = [],
      feedbackRequest = false,
    } = body;

    // Log the incoming data for debugging
    console.log("Received data from client:", { question, answer, courseId });
    console.log("Parsed request details: ", { userId, question, answer, courseId, feedbackRequest });

    // Validate the incoming data
    if (!userId || !question || !courseId) {
      console.error("Missing required fields:", { userId, question, courseId });
      return NextResponse.json(
        { error: "Missing required fields: userId, question, or courseId" },
        { status: 400 }
      );
    }

    // Handle course completion feedback request
    if (feedbackRequest) {
      const finalFeedback = `Thank you for completing the course! Here is your feedback for course "${courseId}".`;
      const feedbackPrompt = `Provide a performance summary for a user "${userId}" who completed the course "${courseId}". 
      Include improvement areas, strengths, and an overall evaluation of their progress on the course.`;

      const chatSession = model.startChat({ generationConfig, history: [] });
      const result = await chatSession.sendMessage(feedbackPrompt);

      if (!result || !result.response) {
        throw new Error("Failed to get a valid response from the AI.");
      }

      const responseText = await result.response.text();
      console.log("AI final feedback response:", responseText);

      chatHistory.push({
        role: "ai",
        content: responseText.trim() || finalFeedback,
      });

      // Save the chat history after getting feedback
      await saveChatHistory(userId, courseId, chatHistory);

      return NextResponse.json({
        isCorrect: true,
        correctAnswer: "",
        explanation: responseText.trim() || finalFeedback,
        chatHistory,
      });
    }

    // Load previous chat history if available
    const previousChatHistory = await loadChatHistory(userId, courseId);
    const updatedChatHistory = [...previousChatHistory, ...chatHistory];

    // Regular question-answer evaluation logic
    const course = dummyCourses.find((course) => course.id === courseId);
    if (!course) {
      console.error(`Course with id "${courseId}" not found.`);
      return NextResponse.json(
        { error: `Course with id "${courseId}" not found.` },
        { status: 404 }
      );
    }

    let correctAnswer = "";
    let explanation = "";
    let found = false;

    // Search for the correct answer within the course's lessons
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        lesson.quiz?.questions.forEach((quizQuestion) => {
          if (quizQuestion.text === question) {
            correctAnswer = quizQuestion.correctAnswer;
            explanation = lesson.content;
            found = true;
          }
        });
      });
    });

    if (!found) {
      console.error(
        `Question "${question}" not found in course "${courseId}".`
      );
      return NextResponse.json(
        { error: `Question "${question}" not found in course "${courseId}".` },
        { status: 404 }
      );
    }

    // If the answer is correct, return the success message
    if (answer?.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      chatHistory.push({
        role: "user",
        content: question,
      });
      chatHistory.push({
        role: "ai",
        content: "Your answer is correct!",
      });

      await saveChatHistory(userId, courseId, chatHistory);

      return NextResponse.json({
        isCorrect: true,
        correctAnswer,
        explanation: "Your answer is correct!",
        chatHistory,
      });
    }

    // Send incorrect answer to AI for detailed feedback
    const prompt = `Evaluate the following answer to the question: "${question}". The user's provided answer is: "${answer}", but the correct answer is: "${correctAnswer}". Explain why the answer is wrong and provide insights based on the lesson content: "${explanation}".`;

    const chatSession = model.startChat({
      generationConfig,
      history: updatedChatHistory,
    });
    const result = await chatSession.sendMessage(prompt);

    if (!result || !result.response) {
      throw new Error("Failed to get a valid response from the AI.");
    }

    const responseText = await result.response.text();

    chatHistory.push({
      role: "user",
      content: question,
    });
    chatHistory.push({
      role: "ai",
      content: responseText.trim() || explanation.trim(),
    });

    await saveChatHistory(userId, courseId, chatHistory);

    return NextResponse.json({
      isCorrect: false,
      correctAnswer,
      explanation: responseText.trim() || explanation.trim(),
      chatHistory,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error evaluating answer:", error.message);
      return NextResponse.json(
        { error: "Failed to evaluate answer", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}