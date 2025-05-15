import { useState } from "react";
import axiosInstance from "@/utils/axios";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await axiosInstance.post("/api/ai/chat", { message });
      setResponse(res.data.reply);
    } catch (error) {
      console.error("Error talking to E-Bot", error);
      setResponse("Sorry, E-Bot is offline...");
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg w-[500px]">
      <h2 className="text-ocean font-bold text-xl mb-2">Ask E-Bot!</h2>
      {response && (
        <div className="mt-4 mb-2 bg-gray-100 p-2 rounded text-lg whitespace-pre-line max-h-64 overflow-y-auto">
          <h1 className="font-bold text-ocean mb-2">E-Bot:</h1>
          {response}
        </div>
      )}
      <textarea
        rows={3}
        className="w-full border rounded p-2 mb-2"
        placeholder="Ask a question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-ocean text-white px-4 py-2 rounded hover:scale-105"
      >
        Send
      </button>
    </div>
  );
};

export default ChatBot;
