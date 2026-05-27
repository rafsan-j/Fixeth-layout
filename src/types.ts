/**
 * TypeScript Interfaces & Shared Domain Types
 * Brand: Fixeth
 */

export interface Track {
  id: string;
  icon: string;
  titleEn: string;
  titleBn: string;
  completed: boolean;
}

export interface AssessmentQuestion {
  qEn: string;
  qBn: string;
  optsEn: string[];
  optsBn: string[];
  ans: number;
}

export interface Lesson {
  id: number;
  title: string;
  done: boolean;
  dur: string;
  active?: boolean;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
  timestamp?: string;
  ts?: string;
}

export interface CodeFiles {
  [filename: string]: string;
}
