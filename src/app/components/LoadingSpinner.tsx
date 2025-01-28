"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        
        <p className="text-teal-600 text-lg font-semibold mt-4 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
