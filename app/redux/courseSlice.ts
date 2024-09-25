import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFirestoreProgress, saveFirestoreProgress } from "./progressService";

// Define the initial state
interface CourseState {
  selectedCourseId: string | null;
  currentModuleIndex: number;
  feedback: string | null; // Add feedback to the state
}

const initialState: CourseState = {
  selectedCourseId: null,
  currentModuleIndex: 0,
  feedback: null, // Initialize feedback as null
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    selectCourse(state, action: PayloadAction<string | null>) {
      state.selectedCourseId = action.payload;
    },

    setModuleIndex(state, action: PayloadAction<number>) {
      state.currentModuleIndex = action.payload;
    },

    advanceModule: (
      state,
      action: PayloadAction<{ email?: string; courseId?: string }>
    ) => {
      const { email, courseId } = action.payload || {};
      if (email && courseId) {
        state.currentModuleIndex += 1;
        saveFirestoreProgress(email, courseId, {
          currentModuleIndex: state.currentModuleIndex,
        });
      }
    },

    previousModule: (
      state,
      action: PayloadAction<{ email?: string; courseId?: string }>
    ) => {
      const { email, courseId } = action.payload || {};
      if (email && courseId) {
        state.currentModuleIndex -= 1;
        saveFirestoreProgress(email, courseId, {
          currentModuleIndex: state.currentModuleIndex,
        });
      }
    },

    // This now correctly updates the state after fetching
    fetchProgressFromFirestore: (
      state,
      action: PayloadAction<{ email: string; courseId: string }>
    ) => {
      const { email, courseId } = action.payload;

      // Fetch progress asynchronously and update state
      (async () => {
        const progress = await getFirestoreProgress(email, courseId);
        if (progress) {
          state.currentModuleIndex = progress.currentModuleIndex;
        }
      })();
    },

    // **New reducers to manage feedback state**
    setFeedback: (state, action: PayloadAction<string | null>) => {
      state.feedback = action.payload; // Set the feedback
    },

    clearFeedback: (state) => {
      state.feedback = null; // Clear the feedback
    },
  },
});

// Export actions
export const {
  selectCourse,
  setModuleIndex,
  advanceModule,
  previousModule,
  fetchProgressFromFirestore,
  setFeedback, // Export new feedback actions
  clearFeedback,
} = courseSlice.actions;

// Export the reducer
export default courseSlice.reducer;
