"use client";

import React, { useEffect, useState } from "react";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { RetellWebClient } from "retell-client-js-sdk";
import Chat from "./Chat";
import axios from "axios";

const retellWebClient = new RetellWebClient();

const RecordButton = ({ chapter }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [callId, setCallId] = useState();
  const [aux, setAux] = useState(false);

  const getCall = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/retell/get-call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        call_id: callId,
        chapter_id: chapter.id,
      }),
    });
  };
  useEffect(() => {
    async function other_aux() {
      if (aux == true) {
        getCall(callId);
      }
    }
    other_aux();
  }, [aux]);

  useEffect(() => {
    retellWebClient.on("call_started", () => {});

    retellWebClient.on("call_ended", async (param) => {
      setIsCalling(false);
      setAux(true);
    });

    retellWebClient.on("agent_start_talking", () => {
      setIsAgentTalking(true);
    });

    retellWebClient.on("agent_stop_talking", () => {
      setIsAgentTalking(false);
    });

    retellWebClient.on("update", (update) => {
      setConversation((prev) => [...prev, update]);
    });

    retellWebClient.on("metadata", (metadata) => {});

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
      await getCall(callId);
      window.location.href = "/history";
    } else {
      const registerCallResponse = await registerCall();
      const callId = registerCallResponse.call_id;

      setCallId(callId);
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

  async function registerCall() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/retell/create-web-call`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            category: chapter.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center">
      <div
        className={`transition-opacity duration-500 ease-in-out transform ${
          isCalling ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Chat conversation={conversation} />
      </div>
      <button
        onClick={toggleConversation}
        className={`bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full drop-shadow-xl transform transition-all duration-300 w-48 h-48 flex items-center justify-center ${
          isAgentTalking ? "animate-pulse" : ""
        }`}
      >
        {isCalling ? (
          <CiMicrophoneOff size={100} />
        ) : (
          <CiMicrophoneOn size={100} />
        )}
      </button>

      <p className="mt-6 text-lg font-medium text-white">
        {!isCalling ? "Presiona para iniciar." : "Presiona para detener."}
      </p>
    </div>
  );
};

export default RecordButton;
