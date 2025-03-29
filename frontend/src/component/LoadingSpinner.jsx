
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-8 border-t-8 border-gray-300 border-t-blue-500 w-16 h-16 "></div>
      <p className="animate-pulse text-lg text-gray-900">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;