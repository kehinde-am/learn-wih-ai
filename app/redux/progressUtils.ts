// progressUtils.ts
export const saveProgressToLocalStorage = (
  userEmail: string,
  courseId: string,
  progress: number
) => {
  const progressKey = `progress_${userEmail}_${courseId}`;
  localStorage.setItem(progressKey, JSON.stringify(progress));
};

export const getProgressFromLocalStorage = (
  userEmail: string,
  courseId: string
): number | null => {
  const progressKey = `progress_${userEmail}_${courseId}`;
  const progress = localStorage.getItem(progressKey);
  return progress ? JSON.parse(progress) : null;
};
