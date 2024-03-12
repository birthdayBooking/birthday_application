import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import useConversation from "../../zustand/useConversation";
import { UserType } from "../../context/UserContext";
import { useSocketContext } from "../../context/SocketContext";
import moment from "moment";

const Conversations = ({
  item,
  thisUserNotifications,
  markAsRead,
  notifications,
}) => {
  const navigation = useNavigation();
  const { setSelectedConversation } = useConversation();
  // const { markAsRead } = useListenMessages();
  const { userId } = useContext(UserType);
  const { onlineUsers } = useSocketContext();

  const participants = item?.participants?.filter(
    (participant) => participant !== userId
  );

  const isOnline = onlineUsers.includes(participants?.toString());

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("Messages");
          setSelectedConversation(item);
          markAsRead(thisUserNotifications, notifications);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderWidth: 0.7,
          borderColor: "#D0D0D0",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 10,
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: "cover",
            }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRjkqpwHZ52ZpaHWqVgMbjYd3mBtOuMSmLw&usqp=CAU",
            }}
          />
          {isOnline && (
            <View
              style={{
                position: "absolute",
                width: 15,
                height: 15,
                borderRadius: 25,
                backgroundColor: "limegreen",
                top: 0,
                right: -2,
              }}
            ></View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {item?.otherParticipant.lastName}
          </Text>
          {/* {item?.newMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastestMessage
              ? truncateText(lastestMessage.message)
              : truncateText(item?.newMessage.message)}
          </Text>
        )} */}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            placeContent: "flex-end space-around",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
            {thisUserNotifications.length > 0 &&
              moment(thisUserNotifications.date).format("HH:mm a")}
          </Text>
          {thisUserNotifications.length > 0 && (
            <View
              style={{
                backgroundColor: "limegreen",
                borderRadius: 50,
                width: 20,
                height: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {thisUserNotifications.length > 0
                  ? thisUserNotifications.length
                  : ""}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default Conversations;

const styles = StyleSheet.create({});
