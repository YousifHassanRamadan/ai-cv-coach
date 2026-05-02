import {
  Code,
  Briefcase,
  Palette,
  Database,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";

export const steps = [
  { number: 1, label: "Tracks" },
  { number: 2, label: "Difficulty" },
  { number: 3, label: "Interviewer" },
  { number: 4, label: "Equipments" },
];

export const roles = [
  { id: "frontend", icon: <Code size={24} />, label: "Frontend Developer" },
  { id: "backend", icon: <Code size={24} />, label: "Backend Developer" },
  { id: "fullstack", icon: <Code size={24} />, label: "Full Stack Engineer" },
  { id: "product", icon: <Briefcase size={24} />, label: "Product Manager" },
  { id: "ux", icon: <Palette size={24} />, label: "UX Designer" },
  { id: "data", icon: <Database size={24} />, label: "Data Scientist" },
];

export const difficultyLabels = [
  { value: 1, label: "Easy" },
  { value: 2, label: "Medium" },
  { value: 3, label: "Hard" },
  { value: 4, label: "Custom" },
];

export const interviewStyles = [
  {
    id: "friendly",
    label: "Friendly Coach",
    description: "Supportive and encouraging",
    icon: <MessageCircle size={24} />,
    color: "bg-teal-500",
  },
  {
    id: "tough",
    label: "Tough Interviewer",
    description: "Challenging and rigorous",
    icon: <Shield size={24} />,
    color: "bg-orange-500",
  },
  {
    id: "technical",
    label: "Technical Expert",
    description: "Deep technical focus",
    icon: <Zap size={24} />,
    color: "bg-blue-500",
  },
];
