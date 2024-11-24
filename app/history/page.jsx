"use client";

import React, { useEffect, useState } from "react";
import HistoryItem from "../components/HistoryItem";
import axios from "axios";
import VideoModal from "@/app/components/VideoModal";

const History = () => {
  const [chapters, setChapters] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState();

  const handleItemClick = (chapter) => {
    setOpenModal(true);
    setSelectedChapter(chapter);
  };

  useEffect(() => {
    async function getChapters() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chapter?user_id=11`
      );
      setChapters(data);
    }
    getChapters();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Escuchemos tus historias
          </h1>
          <p className="text-gray-400 text-lg">Episodios guardados</p>
        </div>

        <div className="space-y-4">
          {chapters &&
            chapters.map((item) => (
              <HistoryItem
                key={item.id}
                title={item.title}
                description={item.description}
                date={"Hace menos de 1 día"}
                duration={"Menos de 1 hora"}
                onClick={() => handleItemClick(item)}
              />
            ))}
        </div>
      </div>
      {selectedChapter && openModal && (
        <VideoModal
          isOpen={openModal}
          videoUrl={selectedChapter.video_link}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default History;
