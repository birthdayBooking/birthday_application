import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { UserType } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessage from "../../hooks/useSendMessage";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";

const ChatMessagesScreen = ({ navigation }) => {
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();

  // const [selectedImage, setSelectedImage] = useState("");
  const { selectedConversation } = useConversation();

  const [message, setMessage] = useState("");
  const { userId } = useContext(UserType);

  const { messages } = useGetMessages();

  const { sendMessage, loading } = useSendMessage();

  const scrollViewRef = useRef(null);

  useListenMessages();

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  // const handleEmojiPress = () => {
  //   setShowEmojiSelector(!showEmojiSelector);
  // };

  const handleSubmit = async (e) => {
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: "cover",
              }}
              source={{
                uri: selectedConversation?.otherParticipant?.avatar
                  ? selectedConversation?.otherParticipant?.avatar
                  : selectedConversation?.hostId?.avatar
                  ? selectedConversation?.hostId?.avatar
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRjkqpwHZ52ZpaHWqVgMbjYd3mBtOuMSmLw&usqp=CAU",
              }}
            />

            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
              {selectedConversation?.otherParticipant?.name
                ? selectedConversation?.otherParticipant?.name
                : selectedConversation?.otherParticipant?.lastName
                ? selectedConversation?.otherParticipant?.lastName
                : selectedConversation?.hostId?.lastName}
            </Text>
          </View>
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null,
    });
  }, [recepientData, selectedMessages]);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages.map((item, index) => {
          const isSelected = selectedMessages.includes(item._id);
          return (
            <Pressable
              key={index}
              style={[
                item?.senderId === userId
                  ? {
                      alignSelf: "flex-end",
                      backgroundColor: "#DCF8C6",
                      padding: 8,
                      maxWidth: "60%",
                      borderRadius: 7,
                      margin: 10,
                    }
                  : {
                      alignSelf: "flex-start",
                      backgroundColor: "white",
                      padding: 8,
                      margin: 10,
                      borderRadius: 7,
                      maxWidth: "60%",
                    },

                isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
              ]}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: isSelected ? "right" : "left",
                }}
              >
                {item?.message}
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 9,
                  color: "gray",
                  marginTop: 5,
                }}
              >
                {formatTime(item.createdAt)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
        }}
      >
        {/* <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        /> */}

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          {/* <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" /> */}
        </View>

        {loading ? (
          <AntDesign name="loading1" size={24} color="black" />
        ) : (
          <Pressable
            onPress={() => handleSubmit()}
            style={{
              backgroundColor: "#007bff",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
          </Pressable>
        )}
      </View>
      {/* 
      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )} */}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
