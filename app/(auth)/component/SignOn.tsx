import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Google from "./Google"; // Google sign-in component
import { AppDispatch } from "@/app/redux/store";
import { signUp, signInWithGoogle } from "@/app/redux/authActions"; // Added signInWithGoogle action
import { useRouter } from "next/navigation";

const SignOn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // Initialize useRouter for programmatic navigation

  // State to track form data and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For Google Sign-In errors

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(""); // Clear previous error
      const resultAction = await dispatch(signInWithGoogle());

      if (signInWithGoogle.fulfilled.match(resultAction)) {
        router.push("/dashboard"); // Redirect to dashboard if successful
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
      console.error("Google sign-in failed:", error);
    }
  };

  // Handle Input Changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submission for Email/Password Sign-Up
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;

    // Reset errors
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Validation
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      hasErrors = true;
    }

    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasErrors = true;
    } else if (formData.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      hasErrors = true;
    }

    if (!formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required",
      }));
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasErrors = true;
    }

    if (hasErrors) return; // Stop form submission if there are errors

    try {
      const resultAction = await dispatch(
        signUp({ email: formData.email, password: formData.password })
      );
      if (signUp.fulfilled.match(resultAction)) {
        // Use router to navigate to the inpages directly after successful sign-up
        router.push("/dashboard");
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <div className="my-4 text-center">
                <Google onClick={handleGoogleSignIn} />
              </div>
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <button type="submit" className="btn w-full text-center">
                Sign Up
              </button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline ml-2" href="/signin">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignOn;
