import * as Linking from "expo-linking";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Color from "../../Utils/Color";
import bg from "../../../assets/images/bg.jpg";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { formatMoney } from "../../Utils/Common";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUser } from "@clerk/clerk-expo";
import PartyCommentModal from "../HomeScreen/party-detail/PartyCommentModal";
import { Ionicons } from "@expo/vector-icons";
const OrderDetailScreen = ({ route }) => {
  const [order, setOrder] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const param = useRoute().params;
  const navigation = useNavigation();

  const mobileUrl = Linking.createURL();

  const handleDeepLinking = async (event) => {
    const data = Linking.parse(event.url);
    if (data.queryParams.vnp_TransactionStatus === "00") {
      const orderResponse = await AsyncStorage.getItem("order");
      const api = {
        status: "completed",
      };
      const responseVnPay = await fetch(
        `https://birthday-backend-8sh5.onrender.com/api/v1/orders/payment-status/${orderResponse}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(api),
        }
      );

      if (responseVnPay.status === 200) {
        navigation.navigate("payment");
      }
    }
  };
  useEffect(async () => {
    Linking.addEventListener("url", handleDeepLinking);
  }, []);

  useEffect(() => {
    fetchOrderDetail(param.orderId);
  }, [param]);
  const fetchOrderDetail = async (orderId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://birthday-backend-8sh5.onrender.com/api/v1/orders/getOrderDetail/${orderId}`
      );
      const data = await response.json();
      setOrder(data);
      setServices(data?.data?.extraService);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handlePayment = async () => {
    await AsyncStorage.setItem("order", order?.data._id);
    const supported = await Linking.canOpenURL(
      `https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url?amount=${order?.data?.total}&mobileUrl=${mobileUrl}`
    );
    if (supported) {
      await Linking.openURL(
        `https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url?amount=${order?.data?.total}&mobileUrl=${mobileUrl}`
      );
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${"https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url"}`
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Phần hình ảnh */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: order?.data?.partyId?.images[0] }}
          style={styles.backgroundImage}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Hóa đơn chi tiết</Text>
          <Text
            style={[
              styles.orderStatus,
              { backgroundColor: getOrderStatusColor(order?.data?.status) },
            ]}
          >
            {order?.data?.status}
          </Text>
        </View>
      </View>
      {/* Phần nội dung còn lại */}
      <View style={styles.contentContainer}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderText}>
            Ngày đặt tiệc:
            {moment(order?.data?.orderDate).format("DD/MM/YYYY")} lúc{" "}
            {moment(order?.data?.orderDate).format("HH:mm")}
          </Text>
          <Text style={styles.orderText}>
            Tên người đại diện: {order?.data?.customerId?.name}
          </Text>
          <Text style={styles.orderText}>Ghi chú: {order?.data?.notes}</Text>
        </View>
        {/* Các mục đã đặt hàng */}
        <View style={styles.itemsContainer}>
          {/* Item chính và item phụ */}
          <View style={styles.itemContainer}>
            <Text style={styles.mainItem}>
              Tiệc {order?.data?.partyId?.name}
            </Text>
            {services &&
              services.map((services, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.extraItem}>+ {services.name} x 1</Text>
                  </View>
                );
              })}
          </View>
          {/* Tổng giá tiền */}
          <Text style={styles.totalPrice}>
            Tổng Thanh Toán:{" "}
            {order?.data?.total.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        {order?.data?.status === "pending" && (
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => handlePayment()}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Outfit-Medium",
                color: Color.WHITE,
                fontSize: 18,
              }}
            >
              Thanh toán
            </Text>
          </TouchableOpacity>
        )}
        {order?.data?.status === "completed" ? (
          !order?.data?.reviews ? (
            <TouchableOpacity
              style={styles.bookingBtn}
              onPress={() => setShowModal(true)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Outfit-Medium",
                  color: Color.WHITE,
                  fontSize: 18,
                }}
              >
                Đánh giá
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.mainItem}>Đánh giá của bạn</Text>
              <View style={styles.commentContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: order?.data?.customerId?.avatar }}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.commentContent}>
                  <Text style={styles.userName}>
                    {order?.data?.customerId?.name}
                  </Text>
                  <View style={styles.ratingContainer}>
                    {[...Array(order?.data?.rating || 0)].map((_, index) => (
                      <Ionicons
                        key={index}
                        name="star"
                        size={20}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                  <Text style={styles.commentText}>{order?.data?.reviews}</Text>
                  <Text style={styles.commentTime}>
                    {moment(order?.data?.updatedAt).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
            </View>
          )
        ) : null}
      </View>
      <Modal animationType="slide" visible={showModal}>
        <PartyCommentModal
          navigation={navigation}
          orderData={order}
          showModal={() => setShowModal(!showModal)}
        />
      </Modal>
    </View>
  );
};

const getOrderStatusColor = (status) => {
  //'pending', 'processing', 'completed', 'cancelled'
  switch (status) {
    case "pending":
      return "#ff9800"; // Màu cam
    case "processing":
      return "#2196f3"; // Màu xanh
    case "completed":
      return "#4caf50"; // Màu xanh lá cây
    case "cancelled":
      return "#f54242";
    default:
      return "#000000"; // Màu đen mặc định
  }
};

const styles = StyleSheet.create({
  ratingContainer: {
    position: "absolute",
    top: 10,
    left: 200,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {},
  commentTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: 200, // Chiều cao của hình ảnh
    resizeMode: "cover",
  },
  header: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "left",
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  orderStatus: {
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  orderInfo: {
    marginBottom: 20,
  },
  orderText: {
    color: "black",
    marginBottom: 5,
    fontFamily: "Outfit-Medium",
  },
  itemsContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
  },
  mainItem: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 24,
    color: Color.PRIMARY_LIGHT,
  },
  extraItem: {
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 14,
    color: "black",
    fontFamily: "Outfit-Medium",
  },
  totalPrice: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
    color: Color.PRIMARY,
    fontFamily: "Outfit-Medium",
  },
  btnContainer: {
    backgroundColor: Color.WHITE,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
    paddingBottom: 10,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
});

export default OrderDetailScreen;
