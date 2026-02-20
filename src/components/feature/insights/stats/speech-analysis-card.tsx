const SpeechAnalysisCard = () => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </div>
        <h3 className="font-semibold">Speech Analysis</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Words per Minute</span>
            <span className="text-sm font-semibold">145</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-teal-500 h-2 rounded-full"
              style={{ width: "73%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Optimal: 120-150 WPM</div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Filler Words</span>
            <span className="text-sm font-semibold">8</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-600 to-cyan-500 h-2 rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Natural Pauses</span>
            <span className="text-sm font-semibold">12</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-teal-500 h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechAnalysisCard;
