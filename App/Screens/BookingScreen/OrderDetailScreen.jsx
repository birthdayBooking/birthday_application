
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { formatMoney } from '../../Utils/Common';
import moment from 'moment';
const OrderDetailScreen = ({ route }) => {
  const [order, setOrder] = useState(null);
  const [service, setService] = useState([])
  const [loading, setLoading] = useState(false);
  const param = useRoute().params;

  useEffect(() => {
    fetchOrderDetail(param.orderId);
  }, [param]);

  const fetchOrderDetail = async (orderId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://birthday-backend-8sh5.onrender.com/api/v1/orders/getOrderDetail/${orderId}`);
      const data = await response.json();
      console.log(data.service);
      setOrder("data ",data);
      console.log(data);
      setService(data.service);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
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
    <View style={styles.container}>
      <Text style={styles.header}>Chi tiết đơn hàng</Text>
      <View style={styles.orderInfo}>
        <Text>Mã đơn hàng: {order?._id}</Text>
        <Text>Ngày đặt hàng: {moment(order?.orderDate).format('DD/MM/yyyy')}</Text>
        <Text>Tổng số tiền: {order?.total}</Text>
        <Text>Trạng thái: {order?.status}</Text>
        {/* {service.map((element, index) => {
          <View key={index}>
            <Text>Trạng thái: {element?.name}</Text>
            <Text>Trạng thái: {element?.price}</Text>
            <Text>Trạng thái: {element?.description}</Text>
          </View>
        })} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderInfo: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default OrderDetailScreen;
