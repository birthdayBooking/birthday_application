import { useContext, useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import { UserType } from "../context/UserContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { userId } = useContext(UserType);
  const { socket } = useSocketContext();
  const [newMessage, setNewMessage] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    if (selectedConversation?.otherParticipant?._id) {
      try {
        const res = await fetch(
          `https://birthday-backend-8sh5.onrender.com/api/v1/messages/send/${selectedConversation?.otherParticipant?._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: userId, message: message }),
          }
        );
        const data = await res.json();

        setNewMessage(data);

        if (data.error) throw new Error(data.error);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await fetch(
          `https://birthday-backend-8sh5.onrender.com/api/v1/messages/send/${selectedConversation?.hostId?._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: userId, message: message }),
          }
        );
        const data = await res.json();

        setNewMessage(data);

        if (data.error) throw new Error(data.error);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (socket === null) return;
    const receiverId = selectedConversation?.otherParticipant?._id
      ? selectedConversation?.otherParticipant?._id
      : selectedConversation?.hostId?._id;
    if (newMessage) {
      socket.emit("sendMessage", { newMessage, receiverId });
    }
  }, [
    newMessage,
    socket,
    selectedConversation?.otherParticipant?._id,
    selectedConversation?.hostId?._id,
  ]);

  return { sendMessage, loading };
};
export default useSendMessage;
