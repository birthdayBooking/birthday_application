import React, { useState, useEffect, useContext } from 'react'; // Import useContext từ thư viện react
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { UserType } from "../../context/UserContext";

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserType); // Sử dụng ngữ cảnh người dùng

  useEffect(() => {
    fetchOrders();
  }, [userId]); // Thêm userId vào mảng phụ thuộc để gọi fetchOrders khi userId thay đổi

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:9902/api/v1/orders/getByIdCustomer/${userId}`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      
      console.error('Lỗi khi lấy lịch sử mua hàng:', error);
      console.log(userId)
      setLoading(false);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 16 }}>Mã đơn hàng: {item._id}</Text>
      <Text style={{ fontSize: 14 }}>Ngày đặt hàng: {item.orderDate}</Text>
      <Text style={{ fontSize: 14 }}>Tổng số tiền: ${item.total}</Text>
      <Text style={{ fontSize: 14 }}>Trạng thái: {item.status}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id.toString()}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

export default HistoryScreen;
