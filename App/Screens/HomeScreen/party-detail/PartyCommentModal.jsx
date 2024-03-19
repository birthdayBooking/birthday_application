import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Heading from "../../../Components/Heading";
import Color from "../../../Utils/Color";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
export default function PartyCommentModal({
  navigation,
  showModal,
  orderData,
}) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useUser();

  const submitReviews = async () => {
    const commentdata = orderData?.data;
    //partyId, rating, comment, customerId, OrderId
    try {
      const reviewData = {
        rating: rating,
        comment: comment,
        customerId: commentdata?.customerId?.id,
        OrderId: commentdata?.id,
        partyId: commentdata?.partyId?.id,
      };
      const response = await fetch(
        "https://birthday-backend-8sh5.onrender.com/api/v1/reviews/reviewParty",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(reviewData),
        }
      );
      const data = await response.json();

      if (data) {
        const orderId = data?.order?.id;
        navigation.navigate("Chi tiết đơn hàng", { orderId });
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitAndShowModal = () => {
    submitReviews();
    showModal();
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={() => showModal()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Outfit-Medium",
          }}
        >
          Bình luận và Đánh giá
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.commentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.fullName}</Text>
          </View>
          <AirbnbRating
            ratingContainerStyle={{
              flex: 1,
              alignItems: "flex-end",
            }}
            showRating={false}
            count={5}
            reviews={["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"]}
            defaultRating={rating}
            size={30}
            onFinishRating={(rating) => setRating(rating)}
          />
        </View>
        <TextInput
          placeholder="Nhập bình luận của bạn..."
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={styles.input} // Sử dụng style đã định nghĩa
        />
      </TouchableOpacity>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.sendcmtBtn}
          onPress={() => handleSubmitAndShowModal()}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Outfit-Medium",
              color: Color.PRIMARY,
              fontSize: 18,
            }}
          >
            Gửi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
    gap: 8,
  },
  sendcmtBtn: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
  commentContainer: {
    flexDirection: "column", // Đổi thành column để xếp các phần tử theo chiều dọc
    padding: 10,
  },
  userInfoContainer: {
    flexDirection: "row", // Xếp avatar và tên người dùng theo chiều ngang
    alignItems: "center",
    marginBottom: 10, // Khoảng cách giữa userInfoContainer và TextInput
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
    backgroundColor: "#ccc", // Màu nền mặc định hoặc màu placeholder
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    flexDirection: "column", // Xếp tên người dùng dưới avatar
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%", // Chiều rộng 100% của phần tử cha
    height: 100, // Chiều cao 100
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});
