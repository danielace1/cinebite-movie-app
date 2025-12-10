const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-transparent text-white gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white/40 blur-xl opacity-50 absolute"></div>
        <div className="w-16 h-16 rounded-full border-4 border-gray-700/40 border-t-white animate-spin"></div>
      </div>
      <span className="text-lg font-semibold tracking-widest text-white animate-pulse">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
