// services/courseService.ts

import { Course } from "@/app/types";
import { dummyCourses } from "@/app/coursesData";

export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate a delay for fetching data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyCourses);
    }, 1000);
  });
};
