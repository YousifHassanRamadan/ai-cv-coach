const NotableMomentsCard = () => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800 mb-8">
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
        <h3 className="font-semibold">Notable Moments</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-[#0f1419] rounded-lg p-4 border-l-4 border-teal-500">
          <p className="text-sm text-gray-300 mb-2 italic">
            "I led the migration of our legacy system to React..."
          </p>
          <p className="text-xs text-teal-400">Great specific example!</p>
        </div>
        <div className="bg-[#0f1419] rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-300 mb-2 italic">
            "Um, so like, I basically, you know..."
          </p>
          <p className="text-xs text-orange-400">
            Consider reducing filler words
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotableMomentsCard;
