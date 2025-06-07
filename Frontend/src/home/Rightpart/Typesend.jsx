


  import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-[7vh]  bg-gray-800">
        <div className=" w-[93%] mx-2">
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl outline-none mt-1 px-4 py-3 w-full"
            style={{
              border: "1px solid #0a2f5a",
              backgroundColor: "white",
              color: "black",
            }}
          />
        </div>




        <button>
          <IoSend className="text-3xl" />
        </button>

      </div>
    </form>
  );
}



export default Typesend;