import React from "react";

function CategorySkeleton() {
  return (
    <div className="relative rounded-2xl p-8 bg-gray-800/50 animate-pulse">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-gray-700/50 rounded-full" />
      </div>
      <div className="h-8 bg-gray-700/50 rounded mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-700/50 rounded w-full" />
        <div className="h-4 bg-gray-700/50 rounded w-4/5" />
        <div className="h-4 bg-gray-700/50 rounded w-2/3" />
      </div>
    </div>
  );
}

export default CategorySkeleton;
