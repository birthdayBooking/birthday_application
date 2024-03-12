import { useEffect, useState, useContext } from "react";
import useConversation from "../zustand/useConversation";
import { UserType } from "../context/UserContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserType);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://birthday-backend-8sh5.onrender.com/api/v1/messages/${selectedConversation.otherParticipant._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderId: userId }),
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?.otherParticipant._id) getMessages();
  }, [selectedConversation?.otherParticipant._id, setMessages, userId]);

  return { messages, loading };
};
export default useGetMessages;
