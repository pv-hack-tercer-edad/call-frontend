import React from "react";

function CategorySkeleton() {
  return (
    <div className="relative rounded-2xl p-10 bg-gray-800/50 animate-pulse">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gray-700/50 rounded-full" />
      </div>
      <div className="h-10 bg-gray-700/50 rounded mb-6" />
      <div className="space-y-4">
        <div className="h-5 bg-gray-700/50 rounded w-full" />
        <div className="h-5 bg-gray-700/50 rounded w-4/5" />
        <div className="h-5 bg-gray-700/50 rounded w-2/3" />
      </div>
    </div>
  );
}

export default CategorySkeleton;
