import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { clearFeedback } from "@/app/redux/courseSlice";
import axios from "axios";
import { dummyCourses } from "@/app/coursesData";
import { getAuth } from "firebase/auth"; // Import Firebase auth

const MessagesContent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const feedback = useSelector((state: RootState) => state.course.feedback);
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string }[]
  >([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("1");
  const [userId, setUserId] = useState<string | null>(null); // Store userId

  // Fetch userId when the component mounts
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid); // Set the user's Firebase ID
    }
  }, []);

  // Function to handle course selection
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  // Function to send message to AI
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const newChatHistory = [
      ...chatHistory,
      { role: "user", content: userMessage },
    ];
    setChatHistory(newChatHistory);

    try {
      const response = await axios.post("/api/evaluate", {
        userId, 
        question: userMessage,
        feedbackRequest: true,
        chatHistory: newChatHistory,
        courseId: selectedCourse,
      });

      const aiResponse = response.data.explanation || "AI is thinking...";
      setChatHistory([...newChatHistory, { role: "ai", content: aiResponse }]);
      setUserMessage("");
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setChatHistory([
        ...newChatHistory,
        { role: "ai", content: "Error occurred. Please try again." },
      ]);
    }
  };

  const handleClearFeedback = () => {
    dispatch(clearFeedback());
    setChatHistory([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat and Feedback</h1>

      {/* Course Selector */}
      <div className="mb-4">
        <label htmlFor="courseSelector" className="mr-2 font-bold">
          Select a Course:
        </label>
        <select
          id="courseSelector"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          {dummyCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Feedback */}
      {feedback ? (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
          <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{feedback}</pre>
        </div>
      ) : (
        <p className="text-gray-600">No feedback available.</p>
      )}

      {/* Display Chat History */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
        <h3 className="text-lg font-bold mb-2">Chat History</h3>
        <div className="overflow-y-auto max-h-60">
          {chatHistory.map((chat, index) => (
            <p
              key={index}
              className={
                chat.role === "user" ? "text-blue-600" : "text-green-600"
              }
            >
              <strong>{chat.role === "user" ? "You" : "AI"}:</strong>{" "}
              {chat.content}
            </p>
          ))}
        </div>
      </div>

      {/* Chat Input and Send Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Ask the AI something..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Send
        </button>
      </div>

      <button
        onClick={handleClearFeedback}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Clear Feedback
      </button>
    </div>
  );
};

export default MessagesContent;