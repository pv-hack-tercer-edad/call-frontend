import React from "react";
import { Play, Clock } from "lucide-react";

const HistoryItem = ({ title, description, date, duration, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-6 mb-4 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-700/50 hover:border-purple-500/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {date}
            </div>
            <div className="flex items-center">
              <Play className="w-4 h-4 mr-1" />
              {duration}
            </div>
          </div>
        </div>
        <div className="ml-4">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <Play className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
