import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store"; // Adjust the import path as necessary

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return !!user; // Return true if user is authenticated, otherwise false
};
