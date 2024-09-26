import axios from "axios";

// Service to evaluate the user's answer using the AI API
export const evaluateAnswer = async (
  question: string,
  answer: string,
  courseId: string,
  userId: string 
) => {
  try {
    // Ensure required parameters are passed
    if (!question || !courseId || !userId) {
      throw new Error("Question, Course ID, or User ID is missing.");
    }

    // Log the request data for debugging
    console.log("API Request - Question:", question, "Course ID:", courseId, "User ID:", userId);

    // Send the request to the API with all necessary parameters
    const response = await axios.post("/api/evaluate", {
      userId,  
      question,
      answer,
      courseId,
    });

    // Return the AI response data
    return response.data;
  } catch (error) {
    console.error("Error in evaluateAnswer function:", error);
    throw error; // Propagate the error so it can be handled in the UI
  }
};
