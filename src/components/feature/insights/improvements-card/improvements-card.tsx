import { AlertTriangle } from "lucide-react";
import type { ImprovementsCardProps } from "./improvements-card.types";
import SectionCard from "../section-card/section-card";
import FeedbackItem from "../feedback-item/feedback-item";
import { useTranslation } from "react-i18next";

const ImprovementsCard = ({ improvements }: ImprovementsCardProps) => {
  const { t } = useTranslation();

  // console.log("improvements", improvements);

  return (
    <SectionCard
      icon={<AlertTriangle className="w-4 h-4 text-orange-500" />}
      iconBg="bg-orange-500/20"
      title={t("areaToImporve")}
    >
      <div className="space-y-3">
        {improvements.map((text, i) => (
          <FeedbackItem key={i} text={text} color="orange" />
        ))}
      </div>
    </SectionCard>
  );
};

export default ImprovementsCard;
