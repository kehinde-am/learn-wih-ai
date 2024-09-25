import React, { useState, useEffect } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  courseId: string;
  onAnswerSelected: (
    selectedOption: string,
    courseId: string
  ) => Promise<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null>;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options = [],
  courseId,
  onAnswerSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [aiResponse, setAIResponse] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Reset states when the question changes
    setSelectedOption("");
    setAttempts(0);
    setAIResponse(null);
    setQuizCompleted(false);
    setErrorMessage("");
  }, [question]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setErrorMessage(""); // Clear error message on new selection
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      setErrorMessage("Please select an option before submitting.");
      return;
    }

    try {
      const response = await onAnswerSelected(selectedOption, courseId);
      setAttempts((prev) => prev + 1);

      if (response) {
        setAIResponse(response);
        if (response.isCorrect) {
          setQuizCompleted(true);
        }
      }
    } catch (error) {
      setErrorMessage("Error occurred while evaluating the answer.");
      console.error(error);
    }
  };

  return (
    <div className="quiz-container">
      <h3 className="text-lg font-bold mb-4">{question}</h3>
      <div className="options mb-4">
        {options.map((option, index) => (
          <label key={index} className="block mb-2">
            <input
              type="radio"
              name="quiz-option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {aiResponse && (
        <div
          className={`mt-4 p-3 rounded-md ${
            aiResponse.isCorrect ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {aiResponse.isCorrect ? "Correct!" : "Incorrect."}
          {aiResponse.explanation && (
            <p className="mt-2">{aiResponse.explanation}</p>
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600"
        disabled={quizCompleted}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuizQuestion;
