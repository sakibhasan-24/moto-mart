export default function AuthButton({ isLoading, text, icon }: any) {
  return (
    <button
      type="submit"
      className="relative cursor-pointer w-full py-3 text-white rounded-lg transition-all flex items-center justify-center 
                 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 
                 before:absolute before:inset-0 before:bg-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity
                 shadow-lg hover:shadow-blue-500/50"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
            viewBox="0 0 24 24"
          ></svg>
          <span className="animate-pulse">{text}...</span>
        </>
      ) : (
        <>
          {icon} <span>{text}</span>
        </>
      )}
    </button>
  );
}
