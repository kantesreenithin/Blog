import React from "react";

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
      {/* Featured Section */}
      <div className="lg:col-span-8 space-y-6">
        {/* Featured Post Card */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image placeholder */}
          <div className="bg-gray-200 rounded-lg w-full md:w-2/5 h-48"></div>

          {/* Text placeholder */}
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="flex gap-2 mt-3">
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Second row of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg h-40"></div>
          <div className="bg-gray-200 rounded-lg h-40"></div>
        </div>
      </div>

      {/* Trending Posts (Sidebar) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;
