// // hooks/useProtectedRoute.ts
// "use client";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./useAuth"; // Adjust the import path if necessary
// import React from "react";

// const useProtectedRoute = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Use useAuth to get user and loading state

//   React.useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         router.replace("/"); // Redirect to error page if not authenticated
//       }
//     }
//   }, [user, loading, router]);

//   return loading; // Return loading state
// };

// export default useProtectedRoute;
// hooks/useProtectedRoute.ts
// "use client";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./useAuth"; // Adjust the import path if necessary
// import React from "react";

// const useProtectedRoute = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth(); // Use useAuth to get user and loading state

//   React.useEffect(() => {
//     if (!loading && !user) {
//       // Redirect to login page if not authenticated
//       router.replace("/login");
//     }
//   }, [user, loading, router]);

//   return loading; // Return loading state
// };

// export default useProtectedRoute;
