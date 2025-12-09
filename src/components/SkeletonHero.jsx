const SkeletonHero = () => {
  return (
    <div className="relative h-[260px] sm:h-[340px] lg:h-[420px] w-full rounded-2xl overflow-hidden bg-gray-800/70 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-[shimmer_2s_infinite] opacity-40" />

      <div className="absolute z-10 left-6 sm:left-10 lg:left-14 top-1/3 space-y-4 w-2/3">
        <div className="h-5 w-24 bg-white/20 rounded-md"></div>
        <div className="h-8 sm:h-10 lg:h-12 w-2/3 bg-white/25 rounded-lg"></div>
        <div className="h-4 w-full bg-white/10 rounded-md"></div>

        <div className="flex gap-3 mt-4">
          <div className="h-10 w-28 bg-white/20 rounded-lg"></div>
          <div className="h-10 w-28 bg-white/10 rounded-lg"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonHero;
