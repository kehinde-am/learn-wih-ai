/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signIn, signInWithGoogle } from "@/app/redux/authActions";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Google from "./Google";

export const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true); // Loading state for checking user session
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard if user is already logged in
    } else {
      setIsLoading(false); // Set loading to false if user is not logged in
    }
  }, [user, router]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(""); // Clear previous error
      const resultAction = await dispatch(signInWithGoogle());

      if (signInWithGoogle.fulfilled.match(resultAction)) {
        router.push("/dashboard");
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
      console.error("Google sign-in failed:", error);
    }
  };

  // Handle Form Submission for Email/Password Sign-In
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrorMessage(""); // Clear previous error before new attempt
      const resultAction = await dispatch(
        signIn({
          email: formData.identifier,
          password: formData.password,
        })
      );

      if (signIn.fulfilled.match(resultAction)) {
        router.push("/dashboard");
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      setErrorMessage(
        "Sign-in failed. Please check your credentials and try again."
      );
      console.error("Form sign-in failed:", error);
    }
  };

  // Handle Input Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show a loading state while waiting for user authentication status
  if (isLoading) return <div>Loading...</div>;

  // Render the form if the user is not logged in
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <div className="my-4 text-center">
                <Google onClick={handleGoogleSignIn} />
              </div>
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Enter your details to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email or Username</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="username or email"
                  value={formData.identifier}
                  onChange={handleChange}
                />
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
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <button type="submit" className="btn w-full text-center">
                Sign In
              </button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline ml-2" href="/signup">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
