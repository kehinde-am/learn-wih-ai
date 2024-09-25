import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

// Interface to represent progress data
interface Progress {
  currentModuleIndex: number;
}

// 1. Get progress from local storage
export const getLocalProgress = (courseId: string): Progress | null => {
  try {
    const progress = localStorage.getItem(`progress_${courseId}`);
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error(`Error getting local progress for courseId ${courseId}:`, error);
    return null;
  }
};

// 2. Save progress to local storage
export const saveLocalProgress = (courseId: string, progress: Progress): void => {
  try {
    localStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
  } catch (error) {
    console.error(`Error saving local progress for courseId ${courseId}:`, error);
  }
};

// 3. Save progress to Firestore
export const saveFirestoreProgress = async (
  email: string,
  courseId: string,
  progress: Progress
): Promise<void> => {
  try {
    const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    await setDoc(progressRef, progress, { merge: true }); // Merge ensures existing data isn't overwritten
  } catch (error) {
    console.error(`Error saving Firestore progress for ${email} and courseId ${courseId}:`, error);
  }
};

// 4. Get progress from Firestore
export const getFirestoreProgress = async (
  email: string,
  courseId: string
): Promise<Progress | null> => {
  try {
    const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      return docSnap.data() as Progress;
    } else {
      return null; // No progress found in Firestore
    }
  } catch (error) {
    console.error(`Error getting Firestore progress for ${email} and courseId ${courseId}:`, error);
    return null;
  }
};

// 5. Sync progress between Firestore and local storage
export const syncProgress = async (
  email: string | null,
  courseId: string
): Promise<Progress> => {
  try {
    // Try to get progress from local storage first
    let progress = getLocalProgress(courseId);

    // If no local progress, check Firestore (if the user is authenticated)
    if (!progress && email) {
      const firestoreProgress = await getFirestoreProgress(email, courseId);

      if (firestoreProgress) {
        // Sync Firestore progress to local storage
        saveLocalProgress(courseId, firestoreProgress);
        progress = firestoreProgress;
      }
    }

    // If no progress is found anywhere, initialize with default progress
    if (!progress) {
      progress = { currentModuleIndex: 0 };
      if (email) {
        await saveFirestoreProgress(email, courseId, progress); // Initialize Firestore if user is authenticated
      }
      saveLocalProgress(courseId, progress); // Always initialize local storage
    }

    return progress;
  } catch (error) {
    console.error(`Error syncing progress for courseId ${courseId}:`, error);
    return { currentModuleIndex: 0 }; // Return default progress if something goes wrong
  }
};

// 6. Save progress both locally and remotely (if online)
export const saveProgress = async (
  email: string | null,
  courseId: string,
  progress: Progress
): Promise<void> => {
  try {
    // Save to local storage first
    saveLocalProgress(courseId, progress);

    // If user is authenticated, save to Firestore
    if (email) {
      await saveFirestoreProgress(email, courseId, progress);
    }
  } catch (error) {
    console.error(`Error saving progress for courseId ${courseId}:`, error);
  }
};

// 7. Update course progress (advances module index)
export const updateCourseProgress = async (
  email: string | null,
  courseId: string,
  newModuleIndex: number
): Promise<void> => {
  const progress = { currentModuleIndex: newModuleIndex };

  try {
    // Save progress to local storage and Firestore (if authenticated)
    await saveProgress(email, courseId, progress);
  } catch (error) {
    console.error(`Error updating progress for courseId ${courseId}:`, error);
  }
};
