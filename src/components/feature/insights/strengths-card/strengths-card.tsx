import { useTranslation } from "react-i18next";
import FeedbackItem from "../feedback-item/feedback-item";
import SectionCard from "../section-card/section-card";
import type { StrengthsCardProps } from "./strengths-card.types";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-text-active"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const StrengthsCard = ({ strengths }: StrengthsCardProps) => {
  const { t } = useTranslation();
  return (
    <SectionCard
      icon={<CheckIcon />}
      iconBg="bg-bg-active/20"
      title={t("Strengths")}
    >
      <div className="space-y-3">
        {strengths.map((text, i) => (
          <FeedbackItem key={i} text={text} color="teal" />
        ))}
      </div>
    </SectionCard>
  );
};
export default StrengthsCard;
