import { Eye } from "lucide-react";
import type { MatchedSkillsProps } from "./matched-skills.types";
import SectionCard from "../section-card/section-card";

const MatchedSkills = ({ skills }: MatchedSkillsProps) => {
  if (skills.length === 0) return null;

  return (
    <SectionCard
      icon={<Eye className="w-4 h-4 text-teal-400" />}
      iconBg="bg-teal-500/20"
      title="Matched Skills"
      className="mb-8"
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </SectionCard>
  );
};

export default MatchedSkills;
