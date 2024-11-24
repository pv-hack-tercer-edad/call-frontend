"use client";

import React, { useEffect, useState } from "react";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { RetellWebClient } from "retell-client-js-sdk";
import Chat from "./Chat";

const retellWebClient = new RetellWebClient();

const RecordButton = ({ chapter }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [callId, setCallId] = useState();
  const [aux, setAux] = useState(false);

  const getCall = async () => {
    const params = new URLSearchParams({
      call_id: callId,
      chapter_id: chapter.id,
    }).toString();

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/retell/get-call?` + `${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      getCall(callId);
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
        `${process.env.NEXT_PUBLIC_API_URL}/retell/create-web-call/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    <div className="flex flex-col justify-center items-center space-x-4">
      {isCalling && <Chat conversation={conversation} />}
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

      <p className="mt-6 text-lg font-medium text-blue-900">
        {!isCalling ? "Presiona para iniciar." : "Presiona para detener."}
      </p>
    </div>
  );
};

export default RecordButton;
