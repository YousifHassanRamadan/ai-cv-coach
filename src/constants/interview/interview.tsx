import {
  Code,
  Briefcase,
  Palette,
  Database,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useInterviewConstants = () => {
  const { t } = useTranslation();

  const steps = [
    { number: 1, label: t("steps.tracks") },
    { number: 2, label: t("steps.difficulty") },
    { number: 3, label: t("steps.interviewer") },
    { number: 4, label: t("steps.equipments") },
  ];

  const roles = [
    {
      id: "frontend",
      icon: <Code size={24} />,
      label: t("roles.frontend"),
    },
    {
      id: "backend",
      icon: <Code size={24} />,
      label: t("roles.backend"),
    },
    {
      id: "fullstack",
      icon: <Code size={24} />,
      label: t("roles.fullstack"),
    },
    {
      id: "product",
      icon: <Briefcase size={24} />,
      label: t("roles.product"),
    },
    {
      id: "ux",
      icon: <Palette size={24} />,
      label: t("roles.ux"),
    },
    {
      id: "data",
      icon: <Database size={24} />,
      label: t("roles.data"),
    },
  ];

  const difficultyLabels = [
    { value: 1, label: t("difficulty2.easy") },
    { value: 2, label: t("difficulty2.medium") },
    { value: 3, label: t("difficulty2.hard") },
    { value: 4, label: t("difficulty2.custom") },
  ];

  const interviewStyles = [
    {
      id: "friendly",
      label: t("styles.friendly.label"),
      description: t("styles.friendly.description"),
      icon: <MessageCircle size={24} />,
      color: "bg-teal-500",
    },
    {
      id: "tough",
      label: t("styles.tough.label"),
      description: t("styles.tough.description"),
      icon: <Shield size={24} />,
      color: "bg-orange-500",
    },
    {
      id: "technical",
      label: t("styles.technical.label"),
      description: t("styles.technical.description"),
      icon: <Zap size={24} />,
      color: "bg-blue-500",
    },
  ];

  return {
    steps,
    roles,
    difficultyLabels,
    interviewStyles,
  };
};
