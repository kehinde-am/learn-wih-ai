import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase-config";
import { selectCourse } from "@/app/redux/courseSlice"; // Import to manage course selection

// Fetch progress from Firestore
const fetchProgressFromFirestore = async (email: string, courseId: string) => {
  try {
    const progressDocRef = doc(db, "userProgress", `${email}_${courseId}`);
    const progressDocSnap = await getDoc(progressDocRef);

    if (progressDocSnap.exists()) {
      return progressDocSnap.data();
    } else {
      console.log("No progress found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching progress from Firestore:", error);
    return null;
  }
};

// Save progress to Firestore
const saveProgressToFirestore = async (
  email: string,
  courseId: string,
  progress: any
) => {
  try {
    const progressDocRef = doc(db, "userProgress", `${email}_${courseId}`);
    await setDoc(progressDocRef, progress, { merge: true });
  } catch (error) {
    console.error("Error saving progress to Firestore:", error);
  }
};

// Fetch user name from Firestore
const fetchUserNameFromFirestore = async (email: string) => {
  try {
    const userDocRef = doc(db, "users", email);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data()?.userName;
    } else {
      const userName = email.split("@")[0]; // Default to email prefix if username not found
      await setDoc(userDocRef, { userName });
      return userName;
    }
  } catch (error) {
    console.error("Error fetching user name from Firestore:", error);
    return null;
  }
};

const HomeContent: React.FC = () => {
  const selectedCourseId = useSelector(
    (state: RootState) => state.course.selectedCourseId
  );
  const [progress, setProgress] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [lastCourseId, setLastCourseId] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const email = user.email || "";

      // Fetch user name from Firestore
      const fetchUserData = async () => {
        const fetchedUserName = await fetchUserNameFromFirestore(email);
        if (fetchedUserName) {
          setUserName(fetchedUserName);
        }
      };

      fetchUserData();
    }

    // Get the last selected course ID from localStorage
    const savedCourseId = localStorage.getItem("lastSelectedCourseId");
    if (savedCourseId) {
      setLastCourseId(savedCourseId);
    }
  }, []);

  useEffect(() => {
    const courseId = selectedCourseId || lastCourseId;

    if (courseId && userName) {
      const fetchProgress = async () => {
        const userProgress = await fetchProgressFromFirestore(
          userName,
          courseId
        );
        setProgress(userProgress);
      };

      fetchProgress();

      // Save the current selected course ID to localStorage
      if (selectedCourseId) {
        localStorage.setItem("lastSelectedCourseId", selectedCourseId);
      }
    }
  }, [selectedCourseId, lastCourseId, userName]);

  // Handle end course and reset progress
  const handleEndCourse = () => {
    // Clear course selection and progress
    localStorage.removeItem("lastSelectedCourseId");
    dispatch(selectCourse(null));
    setProgress(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Learning Journey!
        </h1>
        {userName && <p className="text-lg mb-4">Logged in as: {userName}</p>}
        {selectedCourseId || lastCourseId ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
            <div className="w-full bg-gray-300 rounded-full h-6 mb-4">
              <div
                style={{
                  width: `${
                    progress ? (progress.currentModuleIndex / 10) * 100 : 0
                  }%`,
                }}
                className="bg-blue-500 h-full rounded-full text-center text-white text-sm"
              >
                {progress
                  ? Math.round((progress.currentModuleIndex / 10) * 100)
                  : 0}
                %
              </div>
            </div>
            <p className="text-lg mb-6">
              Keep pushing forward and embrace every challenge!
            </p>

            {/* New End Course button */}
            <button
              onClick={handleEndCourse}
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transition duration-300 ease-in-out"
            >
              End Course
            </button>
          </div>
        ) : (
          <p className="text-lg mb-6">
            No course selected. Get started to begin your journey!
          </p>
        )}

        {/* Back to List button (no clearing progress) */}
        <Link href="/courses">
          <span className="text-lg font-semibold text-blue-500 hover:text-blue-700 underline">
            View Available Courses
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomeContent;
