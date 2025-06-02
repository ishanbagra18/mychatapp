import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    try {
      const response = await axios.post('/api/chatbot/chat', { message: userMessage });
      setBotResponse(response.data.response);
      setUserMessage('');
    } catch (error) {
      toast.error("Error communicating with Chatbot");
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCopy = () => {
    if (botResponse) {
      navigator.clipboard.writeText(botResponse);
      toast.success("Response copied!");
    }
  };

  return (
    <div className="flex-col min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <h1 className='text-white text-3xl font-bold mb-4'>Chat with <span className='text-indigo-400'>AI</span></h1>

      <div className="bg-[#1e293b] shadow-2xl rounded-2xl p-6 w-full max-w-3xl h-[80vh] relative text-white">
        
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-indigo-400 mb-6">AURA</h1>

        {/* Input Section */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-[#334155] text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>

        {/* Response Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Chatbot Response:</h2>
          <div className="bg-[#334155] p-3 rounded-lg text-gray-100 min-h-[50px] relative">
            {botResponse || "No response yet."}

            {botResponse && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-sm bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded-md text-white transition"
              >
                Copy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
