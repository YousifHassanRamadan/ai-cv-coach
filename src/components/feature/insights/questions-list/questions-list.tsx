import { Brain } from "lucide-react";
import type {
  QuestionRowProps,
  QuestionsListProps,
} from "./questions-list.types";
import SectionCard from "../section-card/section-card";

const DIFFICULTY_STYLES = {
  easy: "bg-teal-500/20   text-teal-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  hard: "bg-red-500/20    text-red-400",
};

const QuestionRow = ({ question, index }: QuestionRowProps) => (
  <div className="bg-[#0f1419] rounded-lg p-4 border border-gray-800">
    <div className="flex items-center justify-between gap-3 mb-2">
      <span className="text-xs text-gray-500 font-mono">Q{index + 1}</span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_STYLES[question.difficulty]}`}
      >
        {question.difficulty}
      </span>
    </div>
    <p className="text-sm text-gray-200 mb-3">{question.text}</p>
    <div className="flex flex-wrap gap-1">
      {question.keywords.slice(0, 4).map((keyword) => (
        <span
          key={keyword}
          className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded"
        >
          {keyword}
        </span>
      ))}
    </div>
  </div>
);

const QuestionsList = ({ questions }: QuestionsListProps) => {
  if (questions.length === 0) return null;

  return (
    <SectionCard
      icon={<Brain className="w-4 h-4 text-cyan-400" />}
      iconBg="bg-cyan-500/20"
      title="Questions Asked"
      className="mb-8"
      rightSlot={
        <span className="text-xs text-gray-500">{questions.length} total</span>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, index) => (
          <QuestionRow
            key={question.id ?? index}
            question={question}
            index={index}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default QuestionsList;
