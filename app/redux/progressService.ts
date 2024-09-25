// // services/progressService.ts

// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../firebase/firebase-config";

// // Type definition for progress
// interface Progress {
//   currentModuleIndex: number;
// }

// // 1. Get progress from local storage
// export const getLocalProgress = (courseId: string): Progress | null => {
//   try {
//     const progress = localStorage.getItem(`progress_${courseId}`);
//     return progress ? JSON.parse(progress) : null;
//   } catch (error) {
//     console.error(
//       `Error getting local progress for courseId ${courseId}:`,
//       error
//     );
//     return null;
//   }
// };

// // 2. Save progress to local storage
// export const saveLocalProgress = (
//   courseId: string,
//   progress: Progress
// ): void => {
//   try {
//     localStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
//   } catch (error) {
//     console.error(
//       `Error saving local progress for courseId ${courseId}:`,
//       error
//     );
//   }
// };

// // 3. Save progress to Firestore
// export const saveFirestoreProgress = async (
//   email: string,
//   courseId: string,
//   progress: Progress
// ): Promise<void> => {
//   try {
//     const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
//     await setDoc(progressRef, progress);
//   } catch (error) {
//     console.error(
//       `Error saving Firestore progress for ${email} and courseId ${courseId}:`,
//       error
//     );
//   }
// };

// // 4. Get progress from Firestore
// export const getFirestoreProgress = async (
//   email: string,
//   courseId: string
// ): Promise<Progress | null> => {
//   try {
//     const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
//     const docSnap = await getDoc(progressRef);
//     if (docSnap.exists()) {
//       return docSnap.data() as Progress;
//     }
//     return null;
//   } catch (error) {
//     console.error(
//       `Error getting Firestore progress for ${email} and courseId ${courseId}:`,
//       error
//     );
//     return null;
//   }
// };

// // 5. Retrieve progress using both local storage and Firestore
// export const getProgress = async (
//   email: string | null,
//   courseId: string
// ): Promise<Progress> => {
//   try {
//     // Try to get progress from local storage first
//     let progress = getLocalProgress(courseId);

//     // If no local progress and user is authenticated, try Firestore
//     if (!progress && email) {
//       progress = await getFirestoreProgress(email, courseId);

//       // If progress is found in Firestore, save it locally
//       if (progress) {
//         saveLocalProgress(courseId, progress);
//       }
//     }

//     // Default progress if none is found
//     return progress || { currentModuleIndex: 0 };
//   } catch (error) {
//     console.error(`Error retrieving progress for courseId ${courseId}:`, error);
//     return { currentModuleIndex: 0 };
//   }
// };
// // To be called when the user progresses in a course
// export const updateCourseProgress = async (
//   email: string | null,
//   courseId: string,
//   newModuleIndex: number
// ): Promise<void> => {
//   const progress = { currentModuleIndex: newModuleIndex };
//   await saveProgress(email, courseId, progress);
// };

// // 6. Save progress both locally and remotely (if online)
// export const saveProgress = async (
//   email: string | null,
//   courseId: string,
//   progress: Progress
// ): Promise<void> => {
//   try {
//     // Save to local storage first
//     saveLocalProgress(courseId, progress);

//     // If user is authenticated, save to Firestore
//     if (email) {
//       await saveFirestoreProgress(email, courseId, progress);
//     }
//   } catch (error) {
//     console.error(`Error saving progress for courseId ${courseId}:`, error);
//   }
// };
// services/progressService.ts

// services/progressService.ts

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { SetStateAction } from "react";

// Interface to represent progress data
interface Progress {
  [x: string]: SetStateAction<
    // import { doc, getDoc, setDoc } from "firebase/firestore";
    // import { db } from "../firebase/firebase-config";
    // // Type definition for progress
    // interface Progress {
    //   currentModuleIndex: number;
    // }
    // // 1. Get progress from local storage
    // export const getLocalProgress = (courseId: string): Progress | null => {
    //   try {
    //     const progress = localStorage.getItem(`progress_${courseId}`);
    //     return progress ? JSON.parse(progress) : null;
    //   } catch (error) {
    //     console.error(
    //       `Error getting local progress for courseId ${courseId}:`,
    //       error
    //     );
    //     return null;
    //   }
    // };
    // // 2. Save progress to local storage
    // export const saveLocalProgress = (
    //   courseId: string,
    //   progress: Progress
    // ): void => {
    //   try {
    //     localStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
    //   } catch (error) {
    //     console.error(
    //       `Error saving local progress for courseId ${courseId}:`,
    //       error
    //     );
    //   }
    // };
    // // 3. Save progress to Firestore
    // export const saveFirestoreProgress = async (
    //   email: string,
    //   courseId: string,
    //   progress: Progress
    // ): Promise<void> => {
    //   try {
    //     const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    //     await setDoc(progressRef, progress);
    //   } catch (error) {
    //     console.error(
    //       `Error saving Firestore progress for ${email} and courseId ${courseId}:`,
    //       error
    //     );
    //   }
    // };
    // // 4. Get progress from Firestore
    // export const getFirestoreProgress = async (
    //   email: string,
    //   courseId: string
    // ): Promise<Progress | null> => {
    //   try {
    //     const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    //     const docSnap = await getDoc(progressRef);
    //     if (docSnap.exists()) {
    //       return docSnap.data() as Progress;
    //     }
    //     return null;
    //   } catch (error) {
    //     console.error(
    //       `Error getting Firestore progress for ${email} and courseId ${courseId}:`,
    //       error
    //     );
    //     return null;
    //   }
    // };
    // // 5. Retrieve progress using both local storage and Firestore
    // export const getProgress = async (
    //   email: string | null,
    //   courseId: string
    // ): Promise<Progress> => {
    //   try {
    //     // Try to get progress from local storage first
    //     let progress = getLocalProgress(courseId);
    //     // If no local progress and user is authenticated, try Firestore
    //     if (!progress && email) {
    //       progress = await getFirestoreProgress(email, courseId);
    //       // If progress is found in Firestore, save it locally
    //       if (progress) {
    //         saveLocalProgress(courseId, progress);
    //       }
    //     }
    //     // Default progress if none is found
    //     return progress || { currentModuleIndex: 0 };
    //   } catch (error) {
    //     console.error(`Error retrieving progress for courseId ${courseId}:`, error);
    //     return { currentModuleIndex: 0 };
    //   }
    // };
    // // To be called when the user progresses in a course
    // export const updateCourseProgress = async (
    //   email: string | null,
    //   courseId: string,
    //   newModuleIndex: number
    // ): Promise<void> => {
    //   const progress = { currentModuleIndex: newModuleIndex };
    //   await saveProgress(email, courseId, progress);
    // };
    // // 6. Save progress both locally and remotely (if online)
    // export const saveProgress = async (
    //   email: string | null,
    //   courseId: string,
    //   progress: Progress
    // ): Promise<void> => {
    //   try {
    //     // Save to local storage first
    //     saveLocalProgress(courseId, progress);
    //     // If user is authenticated, save to Firestore
    //     if (email) {
    //       await saveFirestoreProgress(email, courseId, progress);
    //     }
    //   } catch (error) {
    //     console.error(`Error saving progress for courseId ${courseId}:`, error);
    //   }
    // };
    // services/progressService.ts
    // services/progressService.ts
    number
  >;
  currentModuleIndex: number;
}

// Function to get progress from Firestore
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
      return null;
    }
  } catch (error) {
    console.error("Error getting progress from Firestore:", error);
    return null;
  }
};

// Function to save progress to Firestore
export const saveFirestoreProgress = async (
  email: string,
  courseId: string,
  progress: Progress
): Promise<void> => {
  try {
    const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    await setDoc(progressRef, progress, { merge: true });
  } catch (error) {
    console.error("Error saving progress to Firestore:", error);
  }
};
