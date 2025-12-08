const SkeletonCard = () => {
  return (
    <div className="w-full h-56 rounded-lg overflow-hidden bg-gray-800/70 relative">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-40"></div>

      <div className="h-full bg-gray-700"></div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gray-900/60 backdrop-blur-sm rounded-b-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-10 bg-gray-600 rounded"></div>
          <span className="h-1 w-1 bg-gray-600 rounded-full"></span>
          <div className="h-3 w-12 bg-gray-600 rounded"></div>
          <span className="h-1 w-1 bg-gray-600 rounded-full"></span>
          <div className="h-3 w-8 bg-gray-600 rounded"></div>
        </div>

        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
