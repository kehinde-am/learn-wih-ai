"use client";
import React from "react";
import { Sidebar } from "./component/sidebar";
// import useProtectedRoute from "../redux/protectRoute";

const DashboardPage: React.FC = () => {
  // const isLoading = useProtectedRoute(); // Protect this route

  // if (isLoading) {
  //   return <div>Loading...</div>; // Show a loading state while checking authentication
  // }

  return (
    <div>
      <Sidebar />
      {/* Add additional page content here */}
    </div>
  );
};

export default DashboardPage;
