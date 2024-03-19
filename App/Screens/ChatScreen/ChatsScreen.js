import {
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Conversations from "./Conversations";
import useGetConversations from "../../hooks/useGetConversations";
import useListenMessages from "../../hooks/useListenMessages";
import { unreadNotification } from "../../zustand/unreadNotificaiton";

const ChatsScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { conversations, getConversations } = useGetConversations();
  const [refreshing, setRefreshing] = useState(false);
  const { getLatestNotifications, markAsRead } = useListenMessages();

  const handleRefresh = async () => {
    setRefreshing(true);
    await getConversations();
    setRefreshing(false);
  };
  const renderItem = ({ item }) => {
    const unreadNotifications = unreadNotification(getLatestNotifications());

    const thisUserNotifications = unreadNotifications?.filter((n) => {
      return n.senderId === item?.otherParticipant.id;
    });

    return (
      <Conversations
        item={item}
        thisUserNotifications={thisUserNotifications}
        notifications={unreadNotifications}
        markAsRead={markAsRead}
      />
    );
  };

  return (
    <FlatList
      data={conversations}
      keyExtractor={(conversation) => conversation.conversationId}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default ChatsScreen;

ChatsScreen.navigationOptions = {
  headerShown: true, // Show the header only for this screen
};

const styles = StyleSheet.create({});
