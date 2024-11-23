"use client";

import React, { useEffect, useState } from "react";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { RetellWebClient } from "retell-client-js-sdk";
import Chat from "./Chat";

const agentId = "your_agent_id";
const retellWebClient = new RetellWebClient();

const RecordButton = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [conversation, setConversation] = useState([]);

  // Initialize the SDK
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
    });

    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      setIsCalling(false);
    });

    retellWebClient.on("agent_start_talking", () => {
      console.log("agent_start_talking");
      setIsAgentTalking(true);
    });

    retellWebClient.on("agent_stop_talking", () => {
      console.log("agent_stop_talking");
      setIsAgentTalking(false);
    });

    retellWebClient.on("update", (update) => {
      setConversation((prev) => [...prev, update]);
      console.log(update);
    });

    retellWebClient.on("metadata", (metadata) => {
      console.log(metadata);
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
    } else {
      const registerCallResponse = await registerCall(agentId);
      const callId = registerCallResponse.call_id;
      console.log("callId", callId);
      if (registerCallResponse.access_token) {
        retellWebClient
          .startCall({
            accessToken: registerCallResponse.access_token,
          })
          .catch(console.error);
        setConversation([]);
        setIsAgentTalking(false);
        setIsCalling(true);
      }
    }
  };

  async function registerCall(agentId) {
    try {
      const response = await fetch("http://localhost:8080/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {isCalling && <Chat conversation={conversation} />}

      <div className="flex space-x-4">
        <button
          onClick={toggleConversation}
          className={`bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 w-48 h-48 flex items-center justify-center ${
            isAgentTalking ? "animate-pulse" : ""
          }`}
        >
          {isCalling ? (
            <CiMicrophoneOff size={100} />
          ) : (
            <CiMicrophoneOn size={100} />
          )}
        </button>
      </div>

      <p className="mt-6 text-lg font-medium text-blue-900">
        {!isCalling ? "Presiona para iniciar." : "Presiona para detener."}
      </p>
    </div>
  );
};

export default RecordButton;
