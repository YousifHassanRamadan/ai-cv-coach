import React from "react";

const PageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Text */}
      </div>
    </div>
  );
};

export default PageLoading;
