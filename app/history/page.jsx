"use client";

import React from "react";
import HistoryItem from "../components/HistoryItem";

const historyData = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    description:
      "An in-depth discussion about how artificial intelligence is revolutionizing the healthcare industry, from diagnosis to treatment planning and patient care.",
    date: "Today",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Understanding Quantum Computing",
    description:
      "Expert researchers break down the complex world of quantum computing and its potential impact on cryptography, drug discovery, and climate modeling.",
    date: "Yesterday",
    duration: "32 min",
  },
  {
    id: 3,
    title: "The Art of Mindfulness",
    description:
      "Learn practical techniques for incorporating mindfulness into your daily routine and discover its benefits for mental health and productivity.",
    date: "2 days ago",
    duration: "28 min",
  },
  {
    id: 4,
    title: "Sustainable Architecture",
    description:
      "Exploring innovative approaches to eco-friendly building design and the future of sustainable urban development.",
    date: "3 days ago",
    duration: "55 min",
  },
  {
    id: 5,
    title: "The Science of Sleep",
    description:
      "Leading sleep researchers discuss the latest findings in sleep science and share tips for improving your sleep quality.",
    date: "1 week ago",
    duration: "41 min",
  },
];

const History = () => {
  const handleItemClick = (id) => {
    console.log(`Playing episode ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Listening History
          </h1>
          <p className="text-gray-400 text-lg">Your recently played episodes</p>
        </div>

        <div className="space-y-4">
          {historyData.map((item) => (
            <HistoryItem
              key={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
              duration={item.duration}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
