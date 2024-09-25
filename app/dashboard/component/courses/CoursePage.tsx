import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import CourseDetails from "./CourseDetails";
import CourseList from "./CoursesList";

const CoursePage: React.FC = () => {
  const { currentView } = useSelector((state: RootState) => state.navigation);

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === "courseList" ? <CourseList /> : <CourseDetails />}
    </div>
  );
};

export default CoursePage;
