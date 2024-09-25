// export default MessagesContent;
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/app/redux/store";
// import { clearFeedback } from "@/app/redux/courseSlice";

// const MessagesContent: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const feedback = useSelector((state: RootState) => state.course.feedback); // Access feedback from Redux

//   const handleClearFeedback = () => {
//     dispatch(clearFeedback()); // Clear feedback when "Clear Feedback" button is clicked
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Messages Content</h1>

//       {/* Check if there is feedback available */}
//       {feedback ? (
//         <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
//           <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
//           <pre className="whitespace-pre-wrap text-gray-800">{feedback}</pre>

//           <button
//             onClick={handleClearFeedback}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
//           >
//             Clear Feedback
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-600">No feedback available.</p>
//       )}
//     </div>
//   );
// };

// export default MessagesContent;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { clearFeedback } from "@/app/redux/courseSlice";
import axios from "axios";

const MessagesContent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const feedback = useSelector((state: RootState) => state.course.feedback); // Access feedback from Redux
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string }[]
  >([]); // Chat history
  const [userMessage, setUserMessage] = useState<string>(""); // User input

  // Function to send message to AI
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Do nothing if the input is empty

    const newChatHistory = [
      ...chatHistory,
      { role: "user", content: userMessage },
    ];
    setChatHistory(newChatHistory); // Update chat history with user's message

    try {
      const response = await axios.post("/api/evaluate", {
        question: userMessage,
        feedbackRequest: false, // This is a chat interaction
        chatHistory: newChatHistory, // Send the current chat history
        courseId: "your-course-id", // Modify to your course ID logic
      });

      const aiResponse = response.data.explanation || "AI is thinking...";
      setChatHistory([...newChatHistory, { role: "ai", content: aiResponse }]); // Update chat with AI response
      setUserMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message to AI:", error);
    }
  };

  const handleClearFeedback = () => {
    dispatch(clearFeedback()); // Clear feedback when "Clear Feedback" button is clicked
    setChatHistory([]); // Clear chat history as well
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat and Feedback</h1>

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
