// pages/error.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/signin"); // Redirect to the sign-in page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-lg">You are not authorized to view this page.</p>
      <button
        onClick={handleRedirect}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Sign-In Page
      </button>
    </div>
  );
};

export default ErrorPage;
