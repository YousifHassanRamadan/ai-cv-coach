const EyeContactCard = () => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-teal-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        <h3 className="font-semibold">Eye Contact</h3>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#2a2a3a"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#8b5cf6"
              strokeWidth="12"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="57"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold">87%</span>
            <span className="text-xs text-gray-400 mt-1">of time</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400">
        Excellent! You maintained strong eye contact throughout the interview
      </p>
    </div>
  );
};

export default EyeContactCard;
