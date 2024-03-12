import { useEffect, useState, useContext } from "react";
import { UserType } from "../context/UserContext";

const useGetConversations = () => {
  const { setUserId, userId } = useContext(UserType);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(
          `https://birthday-backend-8sh5.onrender.com/api/v1/messages/usermessage/${userId}`
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log("finish");
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
