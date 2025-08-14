import React from "react";
import { Link } from "react-router-dom";

function NoPostFound() {
  return (
    <div className="flex items-center justify-center bg-linear-to-r from-sky-50 via-teal-50 to-cyan-100 max-w-7xl lg:w-300 h-32 p-6 rounded-lg">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sky-900">No Posts found</h3>
        <p className="text-sm font-medium text-gray-700 mt-1">
          go back to <Link to="/" className="underline">home</Link>
        </p>
      </div>
    </div>
  );
}

export default NoPostFound;
