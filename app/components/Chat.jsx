import React, { useEffect, useState, useRef } from "react";

const Chat = ({ conversation }) => {
  const latestMessage =
    conversation.length > 0
      ? conversation[conversation.length - 1].transcript
      : [];

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl mb-8 h-64 overflow-y-auto">
      {latestMessage.map((message, idx) => (
        <div
          key={idx}
          className={`flex ${
            message.role === "agent" ? "justify-start" : "justify-end"
          } mb-2`}
        >
          <div
            className={`p-3 rounded-lg max-w-lg ${
              message.role === "agent"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <p className="text-sm">
              {message.role === "agent" ? "👩🏼‍🏭: " : "Tu 🫵🏻: "}
              {message.content}
            </p>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Chat;