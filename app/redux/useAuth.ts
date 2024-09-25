import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the import path if necessary

export const useAuth = () => {
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  // Determine loading state based on status
  const loading = status === "loading";

  return { user, loading, error };
};
