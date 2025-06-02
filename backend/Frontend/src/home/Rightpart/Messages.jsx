import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listening incoming messages

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  // Track dates that have already been shown
  const shownDates = new Set();

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message, index) => {
          const date = new Date(message.createdAt);
          // Normalize the date to "YYYY-MM-DD"
          const msgDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          const showDate = !shownDates.has(msgDate);
          if (showDate) shownDates.add(msgDate);

          const isLast = index === messages.length - 1;

          // Format to a human-readable string
          const formattedDate = date.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <div key={message._id} ref={isLast ? lastMsgRef : null}>
              <Message
                message={message}
                showDate={showDate}
                dateToShow={formattedDate}
              />
            </div>
          );
        })
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
