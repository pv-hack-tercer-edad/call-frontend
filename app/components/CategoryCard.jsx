"use client";

import React from "react";

const CategoryCard = ({
  id,
  title,
  description,
  icon: Icon,
  gradient,
  onclick,
}) => {
  return (
    <div
      className={`relative group cursor-pointer rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${gradient}`}
      onClick={() => onclick(id)}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

export default CategoryCard;
