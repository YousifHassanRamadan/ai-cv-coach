const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-gray-800 rounded-lg animate-pulse ${className}`} />
);

const LoadingState = () => (
  <div className="min-h-full bg-[#0a0a0f] text-white p-8">
    {/* Header */}
    <SkeletonBox className="h-8 w-48 mb-2" />
    <SkeletonBox className="h-4 w-72 mb-10" />

    {/* Score cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonBox key={i} className="h-44" />
      ))}
    </div>

    {/* Meta stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonBox key={i} className="h-20" />
      ))}
    </div>

    {/* Chart */}
    <SkeletonBox className="h-72 mb-8" />

    {/* Feedback */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <SkeletonBox className="h-52" />
      <SkeletonBox className="h-52" />
    </div>

    {/* Questions */}
    <SkeletonBox className="h-64 mb-8" />

    {/* Progress */}
    <SkeletonBox className="h-72" />
  </div>
);

export default LoadingState;
