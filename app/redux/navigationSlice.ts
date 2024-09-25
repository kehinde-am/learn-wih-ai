import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  currentView: "courseList" | "courseDetails";
  selectedCourseId: string | null;
}

const initialState: NavigationState = {
  currentView: "courseList",
  selectedCourseId: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    showCourseList(state) {
      state.currentView = "courseList";
      state.selectedCourseId = null; // Clear selection when going back to list
    },
    showCourseDetails(state, action: PayloadAction<string>) {
      state.currentView = "courseDetails";
      state.selectedCourseId = action.payload;
    },
  },
});

export const { showCourseList, showCourseDetails } = navigationSlice.actions;
export default navigationSlice.reducer;
