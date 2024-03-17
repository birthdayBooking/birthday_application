import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Color from "../../Utils/Color";
import bg from "../../../assets/images/bg.jpg";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { formatMoney } from "../../Utils/Common";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
const OrderDetailScreen = ({ route }) => {
  const [order, setOrder] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useRoute().params;
  const image = {uri: 'https://png.pngtree.com/background/20210715/original/pngtree-love-big-tree-3d-gift-box-valentine-pink-background-picture-image_1309376.jpg'};

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
    <><ImageBackground source={bg} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
      
        <View style={styles.orderInfo}>
        <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Mã đơn hàng:</Text> {order?.data?._id}</Text>
        <Text style={styles.orderText}>
        <Text style={{color: Color.BLACK}}>Ngày đặt hàng:</Text> {moment(order?.orderDate).format("DD/MM/yyyy")}
          </Text>
          <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Tổng số tiền:</Text> {formatMoney(order?.data?.total)}</Text>
          <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Trạng thái:</Text> {order?.data?.status}</Text>
          {services.map((service, index) => {
            return (
              <View key={service?.id} style={styles.container1}>
                <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Dịch vụ:</Text> {index + 1}</Text>
                <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Tên dịch vụ:</Text>{service?.name}</Text>
                <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Giá dịch vụ</Text> {formatMoney(service?.price)}</Text>
                <Text style={styles.orderText}><Text style={{color: Color.BLACK}}>Mô tả:</Text> {service?.description}</Text>
              </View>
            );
          })}
        </View>
        
      </View></ImageBackground>
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
  container1: {
    padding: 10,
    margin: 5,
    
  },
  orderInfo: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  orderText: {
    fontSize: 16,
    color: Color.PRIMARY,
  },
});

export default OrderDetailScreen;
