// HistoryScreen.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserType } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { formatMoney } from "../../Utils/Common";
import moment from "moment";
import Color from "../../Utils/Color";
const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserType);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://birthday-backend-8sh5.onrender.com/api/v1/orders/getByIdCustomer/${userId}`
      );
      const data = await response.json();
      setOrders(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử mua hàng:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const handleOrderPress = (orderId) => {
    navigation.navigate("Chi tiết đơn hàng", { orderId });
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleOrderPress(item._id)}
      style={styles.orderItem}
    >
      <Text style={styles.orderText}>Mã đơn hàng: {item._id}</Text>
      <Text style={styles.orderText}>
        Ngày Tổ Chức: {moment(item?.orderDate).format("DD/MM/YYYY")}
      </Text>
      <Text style={styles.orderText}>
        Tổng số tiền: {formatMoney(item?.total)}
      </Text>
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
          contentContainerStyle={{padding: 10}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
  },
  orderItem: {
    marginVertical: 3,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Color.WHITE,
    borderRadius: 5,
    backgroundColor: Color.PRIMARY,
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  orderText: {
    fontSize: 16,
    color: Color.LIGHT,
  },
  buttonContainer: {
    marginVertical: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  
});

export default HistoryScreen;
