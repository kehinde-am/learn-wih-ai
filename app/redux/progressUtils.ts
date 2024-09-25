export const saveProgressToLocalStorage = (
  userEmail: string,
  courseId: string,
  progress: number
) => {
  try {
    const progressKey = `progress_${userEmail}_${courseId}`;
    localStorage.setItem(progressKey, JSON.stringify(progress));
  } catch (error) {
    console.error(`Error saving progress to localStorage for ${courseId}:`, error);
  }
};

export const getProgressFromLocalStorage = (
  userEmail: string,
  courseId: string
): number | null => {
  try {
    const progressKey = `progress_${userEmail}_${courseId}`;
    const progress = localStorage.getItem(progressKey);
    
    // Parse and validate that the progress is a number
    if (progress) {
      const parsedProgress = JSON.parse(progress);
      return typeof parsedProgress === 'number' ? parsedProgress : null;
    }
    return null;
  } catch (error) {
    console.error(`Error getting progress from localStorage for ${courseId}:`, error);
    return null;
  }
};
