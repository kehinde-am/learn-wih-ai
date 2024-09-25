// component/signOutButton.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your setup
import { signOutUser } from "@/app/redux/authActions"; // Adjust the import path based on your setup
import { AppDispatch } from "@/app/redux/store";

const SignOutButton: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>(); // Ensure correct typing for dispatch

  const handleLogout = async () => {
    try {
      // Dispatch the signOutUser thunk
      await dispatch(signOutUser()).unwrap();

      // Alert to notify the user
      alert("You have been logged out successfully.");

      // Redirect to the sign-in page
      router.replace("/signin"); // Use replace for immediate redirection
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className="w-full">
      Log Out
    </Button>
  );
};

export default SignOutButton;
