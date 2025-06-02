import React from "react";
import ReactLinkify from "react-linkify";

function Message({ message, showDate, dateToShow }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";

  // Detect links
  const isLink = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/.test(message.message);

  const chatColor = isLink
    ? "#D4D4AA"
    : itsMe
    ? "bg-green-500"
    : "bg-blue-500";

  // Time formatting
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div>
      {showDate && (
        <div className="text-center my-4">
          <span className="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
            {dateToShow}
          </span>
        </div>
      )}
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            <ReactLinkify
              componentDecorator={(href, text, key) => (
                <a
                  href={href}
                  key={key}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  {text}
                </a>
              )}
            >
              {message.message}
            </ReactLinkify>
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;




