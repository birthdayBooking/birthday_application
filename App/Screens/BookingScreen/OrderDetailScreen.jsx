
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const OrderDetailScreen = ({ route }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { orderId } = route.params;
    fetchOrderDetail(orderId);
  }, [route.params]);

  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await fetch(`https://birthday-backend-8sh5.onrender.com/api/v1/orders/${orderId}`);
      const data = await response.json();
      setOrder(data);
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
        <Text>Mã đơn hàng: {order._id}</Text>
        <Text>Ngày đặt hàng: {order.orderDate}</Text>
        <Text>Tổng số tiền: ${order.total}</Text>
        <Text>Trạng thái: {order.status}</Text>
        {/* Hiển thị các thông tin khác của đơn hàng */}
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
