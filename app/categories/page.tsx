"use client";

import React from "react";
import {
  Headphones,
  Music,
  Mic,
  Brain,
  Heart,
  Gamepad,
  Coffee,
  BookOpen,
} from "lucide-react";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    id: "music",
    title: "Music",
    description: "Discover the latest hits and classic tunes",
    icon: Music,
    gradient: "bg-gradient-to-br from-purple-600 to-blue-500",
    onClick: () => (window.location.href = "/1"),
  },
  {
    id: "technology",
    title: "Technology",
    description: "Stay updated with tech trends and news",
    icon: Headphones,
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
    onclick: () => "window.location.href = '/2'",
  },
  {
    id: "education",
    title: "Education",
    description: "Learn something new every day",
    icon: BookOpen,
    gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    onclick: () => "window.location.href = '/3'",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Fun and engaging content for everyone",
    icon: Mic,
    gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
    onclick: () => "window.location.href = '/4'",
  },
  {
    id: "science",
    title: "Science",
    description: "Explore the wonders of our universe",
    icon: Brain,
    gradient: "bg-gradient-to-br from-indigo-500 to-purple-500",
    onclick: () => "window.location.href = '/5'",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    description: "Tips for better living and wellness",
    icon: Heart,
    gradient: "bg-gradient-to-br from-red-500 to-pink-500",
    onclick: () => "window.location.href = '/6'",
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Latest gaming news and discussions",
    icon: Gamepad,
    gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
    onclick: () => "window.location.href = '/7'",
  },
  {
    id: "culture",
    title: "Culture",
    description: "Arts, food, and cultural discussions",
    icon: Coffee,
    gradient: "bg-gradient-to-br from-amber-500 to-red-500",
    onclick: () => "window.location.href = '/8'",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Descubre las categorías
          </h1>
          <p className="text-xl text-gray-300">
            Elige la categoría de la cual quieres ser parte
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
