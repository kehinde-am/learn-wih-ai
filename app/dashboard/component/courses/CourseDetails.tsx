// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/app/redux/store";
// import {
//   advanceModule,
//   previousModule,
//   setModuleIndex,
//   selectCourse,
// } from "@/app/redux/courseSlice";
// import { getAuth } from "firebase/auth";
// import { dummyCourses } from "@/app/coursesData";
// import QuizQuestion from "./QuizQuestion";
// import { evaluateAnswer } from "@/app/redux/geminiAiService"; // Function to evaluate quiz answers
// import axios from "axios";
// import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
// import { db } from "@/app/firebase/firebase-config";

// // Modal component for showing AI feedback
// interface FeedbackModalProps {
//   show: boolean;
//   feedback: string;
//   onClose: () => void;
// }

// const FeedbackModal: React.FC<FeedbackModalProps> = ({
//   show,
//   feedback,
//   onClose,
// }) => {
//   if (!show) return null;
//   return (
//     <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
//         <h2 className="text-2xl font-bold mb-4">
//           AI Feedback on Your Performance
//         </h2>
//         <pre className="whitespace-pre-wrap">{feedback}</pre>
//         <button
//           onClick={onClose}
//           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const CourseDetails: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const selectedCourseId = useSelector(
//     (state: RootState) => state.course.selectedCourseId
//   );
//   const currentModuleIndex = useSelector(
//     (state: RootState) => state.course.currentModuleIndex
//   );

//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0); // Tracks lesson progress
//   const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
//   const [attempts, setAttempts] = useState<number>(0);
//   const [aiFeedbackReceived, setAiFeedbackReceived] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [feedback, setFeedback] = useState<string>("");
//   const [correctAnswers, setCorrectAnswers] = useState<number>(0);
//   const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
//   const [startTime, setStartTime] = useState<number>(Date.now());

//   // Fetch user authentication and course progress
//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (user) {
//       setUserEmail(user.email ?? "");
//       if (selectedCourseId) {
//         fetchProgress(user.email ?? "", selectedCourseId); // Fetch saved progress
//       }
//     }
//     setStartTime(Date.now());
//   }, [selectedCourseId]); // Ensure this runs when course selection changes

//   // Fetch progress from Firestore (only the user's module and lesson progress)
//   const fetchProgress = async (email: string, courseId: string) => {
//     try {
//       const progressDocRef = doc(db, "users", email, "progress", courseId);
//       const docSnap = await getDoc(progressDocRef);

//       if (docSnap.exists()) {
//         const progressData = docSnap.data();
//         if (progressData.currentModuleIndex !== undefined) {
//           dispatch(setModuleIndex(progressData.currentModuleIndex)); // Restore the module index
//         }
//         if (progressData.currentLessonIndex !== undefined) {
//           setCurrentLessonIndex(progressData.currentLessonIndex); // Restore the lesson index
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch progress from Firestore:", error);
//     }
//   };

//   // Save progress to Firestore (current module and lesson indices)
//   const saveProgressToFirestore = async (progressData: {
//     userEmail: string;
//     courseId: string;
//     currentModuleIndex: number;
//     currentLessonIndex: number;
//   }) => {
//     try {
//       const progressDocRef = doc(
//         db,
//         "users",
//         progressData.userEmail,
//         "progress",
//         progressData.courseId
//       );
//       await setDoc(
//         progressDocRef,
//         {
//           currentModuleIndex: progressData.currentModuleIndex,
//           currentLessonIndex: progressData.currentLessonIndex,
//         },
//         { merge: true }
//       );
//       console.log("Progress saved successfully");
//     } catch (error) {
//       console.error("Failed to save progress to Firestore", error);
//     }
//   };

//   // End Course Function
//   // End Course Function
//   const handleEndCourse = async () => {
//     if (userEmail && selectedCourseId) {
//       try {
//         // Delete course progress from Firestore
//         const progressDocRef = doc(
//           db,
//           "users",
//           userEmail,
//           "progress",
//           selectedCourseId
//         );
//         await deleteDoc(progressDocRef);
//         console.log("Course ended and progress deleted");

//         // Clear progress in Redux state
//         dispatch(setModuleIndex(0));
//         setCurrentLessonIndex(0);

//         // Reset the selected course
//         dispatch(selectCourse(null));
//       } catch (error) {
//         console.error("Failed to end the course:", error);
//       }
//     }
//   };

//   // **Fixed: Implementing the generateAiFeedback function**
//   const generateAiFeedback = async (courseName: string): Promise<string> => {
//     const totalTimeSpent = (Date.now() - startTime) / 1000;

//     const prompt = `Provide detailed feedback for the user with email "${userEmail}" who completed the course "${courseName}". The user completed the course in ${totalTimeSpent.toFixed(
//       2
//     )} seconds. They answered ${correctAnswers} questions correctly and ${incorrectAnswers} questions incorrectly. Evaluate their progress, suggest areas for improvement, and provide advice on how they can improve.`;

//     try {
//       const response = await axios.post("/api/evaluate", {
//         question: prompt,
//         courseId: selectedCourseId,
//         feedbackRequest: true,
//       });

//       return (
//         response.data.explanation || "Thank you for completing the course!"
//       );
//     } catch (error) {
//       console.error("Failed to generate AI feedback", error);
//       return "An error occurred while generating your feedback. Please try again.";
//     }
//   };

//   // Handle quiz answer selection and AI evaluation
//   const handleAnswerSelected = async (
//     selectedOption: string,
//     courseId: string
//   ) => {
//     const course = dummyCourses.find((course) => course.id === courseId);
//     const currentLesson =
//       course?.modules[currentModuleIndex]?.lessons?.[currentLessonIndex];

//     if (currentLesson?.quiz) {
//       try {
//         // Call the evaluateAnswer function
//         const response = await evaluateAnswer(
//           currentLesson.quiz.questions[0].text,
//           selectedOption,
//           courseId,
//           userEmail ?? ""
//         );

//         setAttempts((prevAttempts) => prevAttempts + 1);

//         if (response.isCorrect) {
//           setCorrectAnswers((prevCorrect) => prevCorrect + 1);
//           setQuizCompleted(true);
//         } else {
//           setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
//           if (attempts >= 1) {
//             setAiFeedbackReceived(true);
//             setQuizCompleted(true);
//           }
//         }

//         return response;
//       } catch (error) {
//         console.error("Failed to evaluate answer", error);
//         return null;
//       }
//     }
//   };

//   // Handle navigation to the next module or lesson
//   const handleNextModule = async () => {
//     const course = dummyCourses.find(
//       (course) => course.id === selectedCourseId
//     );

//     if (course) {
//       if (
//         currentModuleIndex === course.modules.length - 1 &&
//         currentLessonIndex ===
//           course.modules[currentModuleIndex].lessons.length - 1
//       ) {
//         // End of course, generate final feedback
//         const finalFeedback = await generateAiFeedback(course.name);
//         setFeedback(finalFeedback);
//         setShowModal(true);
//       } else {
//         // Save progress before moving to the next module
//         await saveProgressToFirestore({
//           userEmail: userEmail!,
//           courseId: selectedCourseId!,
//           currentModuleIndex: currentModuleIndex,
//           currentLessonIndex: currentLessonIndex,
//         });

//         // Reset lesson index and move to the next module
//         setCurrentLessonIndex(0);
//         setQuizCompleted(false);
//         setAttempts(0);

//         // Move to next module
//         dispatch(
//           advanceModule({
//             email: userEmail ?? undefined,
//             courseId: selectedCourseId ?? undefined,
//           })
//         );
//       }
//     }
//   };

//   // Handle moving back to the previous module
//   const handlePreviousModule = () => {
//     if (currentModuleIndex > 0) {
//       dispatch(
//         previousModule({
//           email: userEmail ?? undefined,
//           courseId: selectedCourseId ?? undefined,
//         })
//       );
//       setCurrentLessonIndex(0); // Reset to the first lesson of the previous module
//     }
//   };

//   const course = dummyCourses.find((course) => course.id === selectedCourseId); // Ensure dummyCourses is being read
//   if (!course)
//     return <div className="text-center py-10">Course not found.</div>;

//   const currentModule = course.modules[currentModuleIndex];
//   const currentLesson = currentModule.lessons[currentLessonIndex];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4">
//       <FeedbackModal
//         show={showModal}
//         feedback={feedback}
//         onClose={() => setShowModal(false)}
//       />

//       <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full max-w-[1200px] shadow-lg border rounded-md mx-auto">
//         {/* Back to Course List Button */}
//         <button
//           onClick={() => dispatch(selectCourse(null))}
//           className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
//         >
//           Back to Course List
//         </button>

//         {/* New End Course Button */}
//         <button
//           onClick={handleEndCourse}
//           className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transition duration-300 ease-in-out"
//         >
//           End Course
//         </button>

//         <h1 className="text-3xl font-bold mb-6">{course.name}</h1>
//         <h2 className="text-xl sm:text-2xl font-semibold mb-4">
//           {currentModule.title}
//         </h2>
//         <p className="text-gray-700 mb-6 text-center">
//           {currentModule.description}
//         </p>
//         {currentLesson && (
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">
//               {currentLesson.title}
//             </h3>
//             <p className="text-gray-700 mb-4">{currentLesson.content}</p>
//             {currentLesson.quiz && (
//               <div>
//                 <h4 className="text-md font-semibold mb-2">Quiz</h4>
//                 {currentLesson.quiz.questions.map((question) => (
//                   <QuizQuestion
//                     key={question.id}
//                     question={question.text}
//                     options={question.options}
//                     courseId={selectedCourseId!}
//                     onAnswerSelected={handleAnswerSelected}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//         <div className="flex justify-between w-full">
//           {currentModuleIndex > 0 && (
//             <button
//               onClick={handlePreviousModule}
//               className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
//             >
//               Previous Module
//             </button>
//           )}
//           <button
//             onClick={handleNextModule}
//             className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
//           >
//             {currentModuleIndex === course.modules.length - 1 &&
//             currentLessonIndex === currentModule.lessons.length - 1
//               ? "Finish Course"
//               : "Next Module"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  advanceModule,
  previousModule,
  setModuleIndex,
  selectCourse,
  setFeedback, // Redux action for setting feedback
  clearFeedback, // Redux action to clear feedback
} from "@/app/redux/courseSlice";
import { getAuth } from "firebase/auth";
import { dummyCourses } from "@/app/coursesData";
import QuizQuestion from "./QuizQuestion";
import { evaluateAnswer } from "@/app/redux/geminiAiService";
import axios from "axios";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase-config";
import MessagesContent from "../MessagesContent"; // Import MessagesContent

// Modal component for showing AI feedback
interface FeedbackModalProps {
  show: boolean;
  feedback: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  show,
  feedback,
  onClose,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4">
          AI Feedback on Your Performance
        </h2>
        <pre className="whitespace-pre-wrap">{feedback}</pre>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CourseDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCourseId = useSelector(
    (state: RootState) => state.course.selectedCourseId
  );
  const currentModuleIndex = useSelector(
    (state: RootState) => state.course.currentModuleIndex
  );
  const feedback = useSelector((state: RootState) => state.course.feedback); // Get feedback from Redux

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [aiFeedbackReceived, setAiFeedbackReceived] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false); // State to toggle chat display
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Fetch user authentication and course progress
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email ?? "");
      if (selectedCourseId) {
        fetchProgress(user.email ?? "", selectedCourseId); // Fetch saved progress
      }
    }
    setStartTime(Date.now());
  }, [selectedCourseId]);

  const fetchProgress = async (email: string, courseId: string) => {
    try {
      const progressDocRef = doc(db, "users", email, "progress", courseId);
      const docSnap = await getDoc(progressDocRef);
      if (docSnap.exists()) {
        const progressData = docSnap.data();
        if (progressData.currentModuleIndex !== undefined) {
          dispatch(setModuleIndex(progressData.currentModuleIndex));
        }
        if (progressData.currentLessonIndex !== undefined) {
          setCurrentLessonIndex(progressData.currentLessonIndex);
        }
      }
    } catch (error) {
      console.error("Failed to fetch progress from Firestore:", error);
    }
  };

  const saveProgressToFirestore = async (progressData: {
    userEmail: string;
    courseId: string;
    currentModuleIndex: number;
    currentLessonIndex: number;
  }) => {
    try {
      const progressDocRef = doc(
        db,
        "users",
        progressData.userEmail,
        "progress",
        progressData.courseId
      );
      await setDoc(
        progressDocRef,
        {
          currentModuleIndex: progressData.currentModuleIndex,
          currentLessonIndex: progressData.currentLessonIndex,
        },
        { merge: true }
      );
      console.log("Progress saved successfully");
    } catch (error) {
      console.error("Failed to save progress to Firestore", error);
    }
  };

  const handleEndCourse = async () => {
    if (userEmail && selectedCourseId) {
      try {
        const progressDocRef = doc(
          db,
          "users",
          userEmail,
          "progress",
          selectedCourseId
        );
        await deleteDoc(progressDocRef);
        console.log("Course ended and progress deleted");

        dispatch(setModuleIndex(0));
        setCurrentLessonIndex(0);

        dispatch(selectCourse(null));
      } catch (error) {
        console.error("Failed to end the course:", error);
      }
    }
  };

  const generateAiFeedback = async (courseName: string): Promise<string> => {
    const totalTimeSpent = (Date.now() - startTime) / 1000;

    const prompt = `Provide detailed feedback for the user with email "${userEmail}" who completed the course "${courseName}". The user completed the course in ${totalTimeSpent.toFixed(
      2
    )} seconds. They answered ${correctAnswers} questions correctly and ${incorrectAnswers} questions incorrectly. Evaluate their progress, suggest areas for improvement, and provide advice on how they can improve.`;

    try {
      const response = await axios.post("/api/evaluate", {
        question: prompt,
        courseId: selectedCourseId,
        feedbackRequest: true,
      });

      const feedbackData =
        response.data.explanation || "Thank you for completing the course!";

      // Save feedback to Redux
      dispatch(setFeedback(feedbackData));

      return feedbackData;
    } catch (error) {
      console.error("Failed to generate AI feedback", error);
      return "An error occurred while generating your feedback. Please try again.";
    }
  };

  const handleAnswerSelected = async (
    selectedOption: string,
    courseId: string
  ) => {
    const course = dummyCourses.find((course) => course.id === courseId);
    const currentLesson =
      course?.modules[currentModuleIndex]?.lessons?.[currentLessonIndex];

    if (currentLesson?.quiz) {
      try {
        const response = await evaluateAnswer(
          currentLesson.quiz.questions[0].text,
          selectedOption,
          courseId,
          userEmail ?? ""
        );

        setAttempts((prevAttempts) => prevAttempts + 1);

        if (response.isCorrect) {
          setCorrectAnswers((prevCorrect) => prevCorrect + 1);
          setQuizCompleted(true);
        } else {
          setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
          if (attempts >= 1) {
            setAiFeedbackReceived(true);
            setQuizCompleted(true);
          }
        }

        return response;
      } catch (error) {
        console.error("Failed to evaluate answer", error);
        return null;
      }
    }
  };

  const handleNextModule = async () => {
    const course = dummyCourses.find(
      (course) => course.id === selectedCourseId
    );

    if (course) {
      if (
        currentModuleIndex === course.modules.length - 1 &&
        currentLessonIndex ===
          course.modules[currentModuleIndex].lessons.length - 1
      ) {
        const finalFeedback = await generateAiFeedback(course.name);
        setShowModal(true);
        setShowChat(true); // Show the chat after feedback
      } else {
        await saveProgressToFirestore({
          userEmail: userEmail!,
          courseId: selectedCourseId!,
          currentModuleIndex: currentModuleIndex,
          currentLessonIndex: currentLessonIndex,
        });

        setCurrentLessonIndex(0);
        setQuizCompleted(false);
        setAttempts(0);

        dispatch(
          advanceModule({
            email: userEmail ?? undefined,
            courseId: selectedCourseId ?? undefined,
          })
        );
      }
    }
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      dispatch(
        previousModule({
          email: userEmail ?? undefined,
          courseId: selectedCourseId ?? undefined,
        })
      );
      setCurrentLessonIndex(0);
    }
  };

  const course = dummyCourses.find((course) => course.id === selectedCourseId);
  if (!course)
    return <div className="text-center py-10">Course not found.</div>;

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <FeedbackModal
        show={showModal}
        feedback={feedback || ""}
        onClose={() => setShowModal(false)}
      />

      <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full max-w-[1200px] shadow-lg border rounded-md mx-auto">
        <button
          onClick={() => dispatch(selectCourse(null))}
          className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          Back to Course List
        </button>

        <button
          onClick={handleEndCourse}
          className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transition duration-300 ease-in-out"
        >
          End Course
        </button>

        <h1 className="text-3xl font-bold mb-6">{course.name}</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {currentModule.title}
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          {currentModule.description}
        </p>
        {currentLesson && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {currentLesson.title}
            </h3>
            <p className="text-gray-700 mb-4">{currentLesson.content}</p>
            {currentLesson.quiz && (
              <div>
                <h4 className="text-md font-semibold mb-2">Quiz</h4>
                {currentLesson.quiz.questions.map((question) => (
                  <QuizQuestion
                    key={question.id}
                    question={question.text}
                    options={question.options}
                    courseId={selectedCourseId!}
                    onAnswerSelected={handleAnswerSelected}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between w-full">
          {currentModuleIndex > 0 && (
            <button
              onClick={handlePreviousModule}
              className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Previous Module
            </button>
          )}
          <button
            onClick={handleNextModule}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {currentModuleIndex === course.modules.length - 1 &&
            currentLessonIndex === currentModule.lessons.length - 1
              ? "Finish Course"
              : "Next Module"}
          </button>
        </div>
      </div>

      {/* Display the chat only when feedback is generated */}
      {showChat && (
        <div className="mt-8">
          <MessagesContent />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
