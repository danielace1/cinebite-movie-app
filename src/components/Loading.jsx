const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-col1"></div>
      <span className="ml-3 text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default Loading;
