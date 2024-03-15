// HistoryScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { UserType } from "../../context/UserContext";
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserType);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://birthday-backend-8sh5.onrender.com/api/v1/orders/getByIdCustomer/${userId}`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử mua hàng:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const handleOrderPress = (orderId) => {
    navigation.navigate('OrderDetail', { orderId });
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item._id)} style={styles.orderItem}>
      <Text style={styles.orderText}>Mã đơn hàng: {item._id}</Text>
      <Text style={styles.orderText}>Ngày đặt hàng: {item.orderDate}</Text>
      <Text style={styles.orderText}>Tổng số tiền: ${item.total}</Text>
      <Text style={styles.orderText}>Trạng thái: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderText: {
    fontSize: 16,
  },
});

export default HistoryScreen;
