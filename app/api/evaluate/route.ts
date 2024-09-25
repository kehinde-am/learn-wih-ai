import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dummyCourses } from "@/app/coursesData"; // Assuming course data is here

// Set up the Google Generative AI API key
const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyBF-4k982pqYn7aDjdlfmkn1E9MsJAVXPA";

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

export async function POST(req: Request) {
  try {
    console.log("POST request received at /api/evaluate");

    // Parse the request body to get the question, answer, and courseId
    const body = await req.json();
    const {
      question,
      answer,
      courseId,
      chatHistory = [],
      feedbackRequest = false,
    } = body;

    // Log the incoming data for debugging
    console.log("Received data from client:", { question, answer, courseId });

    // Validate the incoming data
    if (!question || !courseId) {
      console.error("Missing required fields:", { question, courseId });
      return NextResponse.json(
        { error: "Missing required fields: question or courseId" },
        { status: 400 }
      );
    }

    // Handle course completion feedback request
    if (feedbackRequest) {
      const finalFeedback = `Thank you for completing the course! Here is your feedback for course "${courseId}".`;

      // Send a custom prompt to AI for detailed feedback
      const feedbackPrompt = `Provide a performance summary for a user who completed the course "${courseId}". Include improvement areas, strengths, and an overall evaluation of their progress.`;

      const chatSession = model.startChat({ generationConfig, history: [] });
      const result = await chatSession.sendMessage(feedbackPrompt);

      if (!result || !result.response) {
        throw new Error("Failed to get a valid response from the AI.");
      }

      const responseText = await result.response.text();

      // Log AI response text
      console.log("AI final feedback response:", responseText);

      return NextResponse.json({
        isCorrect: true,
        correctAnswer: "",
        explanation: responseText.trim() || finalFeedback,
      });
    }

    // For regular question-answer evaluation
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
            explanation = lesson.content; // Use the lesson content as explanation
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
    if (answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      console.log("Answer is correct.");
      return NextResponse.json({
        isCorrect: true,
        correctAnswer,
        explanation: "Your answer is correct!",
      });
    }

    // Otherwise, send a detailed prompt to the AI explaining the incorrect answer
    const prompt = `Evaluate the following answer to the question: "${question}". The user's provided answer is: "${answer}", but the correct answer is: "${correctAnswer}". Explain why the answer is wrong and provide insights based on the lesson content: "${explanation}".`;

    console.log("Sending prompt to AI:", prompt);

    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
    });
    const result = await chatSession.sendMessage(prompt);

    if (!result || !result.response) {
      throw new Error("Failed to get a valid response from the AI.");
    }

    const responseText = await result.response.text();

    // Log AI response text
    console.log("AI response text:", responseText);

    return NextResponse.json({
      isCorrect: false,
      correctAnswer,
      explanation: responseText.trim() || explanation.trim(),
    });
  } catch (error) {
    // Type-check the error
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
