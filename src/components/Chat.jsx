import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { updateMessages } from "../utils/chatSlice";

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state?.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  const chats = useSelector((state) => state?.chats);

  console.log("chats", chats);
  const messagesRef = React.useRef(null);

  const fetchMessages = async (toUserId) => {
    // Fetch messages from the server or API
    const response = await axios.get(`${BASE_URL}/chats/${toUserId}`, {
      withCredentials: true,
    });
    const data = response.data.messages;
    console.log("data", data);

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const chatMessages = data.map((msg) => ({
      firstName: msg.senderId.firstName,
      lastName: msg.senderId.lastName,
      text: msg.text,
      profileurl: msg.senderId.photoUrl,
      userId: msg.senderId._id,
      time: formatTime(msg.timestamp),
    }));
    setMessages(chatMessages);
    dispatch(updateMessages(chatMessages));
  };

  useEffect(() => {
    if (messagesRef.current) {
      // scroll to bottom when messages change
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
    fetchMessages(toUserId);
  }, [toUserId, messages.length]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, toUserId });

    socket.on(
      "receiveMessage",
      ({ firstName, text, userId, toUserId, profileurl }) => {
        console.log("firstName", firstName, "text", text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { firstName, text, toUserId, userId, profileurl },
        ]);
      },
    );
    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  const handleSendMessage = () => {
    if (!newMessage) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      text: newMessage,
      userId,
      toUserId,
      profileurl: user?.photoUrl,
    });
    setNewMessage("");
  };

  return (
    <div className="border border-gray-300 rounded-lg flex flex-col w-full max-w-md mx-auto mt-10 h-[70vh]">
      <h1 className="border-b text-2xl p-4 text-center">Chat</h1>

      {/* messages area: allow scroll, must set min-h-0 for flex children */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto min-h-0 space-y-1 bg-white"
      >
        {messages?.length > 0 ? (
          messages?.map((msg, index) => (
            <div
              key={index}
              className={`chat ${msg.userId === userId ? "chat-end" : "chat-start"} p-3`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src={
                      msg.profileurl ? msg.profileurl : "/assets/profile.png"
                    }
                  />
                </div>
              </div>
              <div className="chat-header text-blue-900 text-md">
                {msg.firstName} {msg.lastName}
                <time className="text-xs opacity-70">{msg.time}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
      </div>

      {/* footer: fixed height within the container */}
      <div className="border-t p-4 flex gap-2 items-center">
        <input
          type="text"
          required
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="input input-bordered flex-1"
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
