"use client";

import React, { useEffect, useState } from "react";
import {
  Headphones,
  Music,
  Mic,
  Brain,
  Heart,
  Gamepad,
  Coffee,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import CategorySkeleton from "../components/CategorySkeleton";
import RecordButton from "../components/Record";

interface Category {
  theme: string;
  content: string;
  id: number;
}

const icons: LucideIcon[] = [
  Music,
  Headphones,
  BookOpen,
  Mic,
  Brain,
  Heart,
  Gamepad,
  Coffee,
];
const gradients: string[] = [
  "bg-gradient-to-br from-purple-600 to-blue-500",
  "bg-gradient-to-br from-cyan-500 to-blue-500",
  "bg-gradient-to-br from-green-500 to-emerald-500",
  "bg-gradient-to-br from-pink-500 to-rose-500",
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-red-500 to-pink-500",
  "bg-gradient-to-br from-yellow-500 to-orange-500",
  "bg-gradient-to-br from-amber-500 to-red-500",
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [record, setRecord] = useState<boolean>(false);

  console.log({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/generative-questions/`
        );
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (record) {
    return <RecordButton />;
  }

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
          {isLoading
            ? [...Array(4)].map((_, index) => <CategorySkeleton key={index} />)
            : categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  title={category.theme}
                  description={category.content}
                  icon={icons[index % icons.length]}
                  gradient={gradients[index % gradients.length]}
                  onClick={() => setRecord(true)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
