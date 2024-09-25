import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;

  extras?: ReactNode;
}
// types.ts
export interface Course {
  lessons: any;
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  description: ReactNode;
  id: string;
  title: string;
  content: string;
  quiz?: Quiz;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}
interface AuthState {
  user: { email: string } | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
  isRegistering: boolean; // Add this if it isn't already present
}
