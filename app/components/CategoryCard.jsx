"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

function CategoryCard({
  id,
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
}) {
  return (
    <div
      className={`relative group cursor-pointer rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${gradient}`}
      onClick={() => onClick(`/categories/${id}`)}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-200 line-clamp-3">{description}</p>
    </div>
  );
}

export default CategoryCard;
