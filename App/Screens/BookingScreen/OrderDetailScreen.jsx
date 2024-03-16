import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { formatMoney } from "../../Utils/Common";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
const OrderDetailScreen = ({ route }) => {
  const [order, setOrder] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useRoute().params;

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
      setServices(data.service);
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

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Chi tiết đơn hàng</Text>
        <View style={styles.orderInfo}>
          <Text>Mã đơn hàng: {order?.data?._id}</Text>
          <Text>
            Ngày đặt hàng: {moment(order?.orderDate).format("DD/MM/yyyy")}
          </Text>
          <Text>Tổng số tiền: {formatMoney(order?.data?.total)}</Text>
          <Text>Trạng thái: {order?.data?.status}</Text>
          {services.map((service, index) => {
            return (
              <View key={service?.id}>
                <Text> Service: {index + 1}</Text>
                <Text>Service Name: {service?.name}</Text>
                <Text>Service Price: {formatMoney(service?.price)}</Text>
                <Text>Service Description: {service?.description}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderInfo: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});

export default OrderDetailScreen;
