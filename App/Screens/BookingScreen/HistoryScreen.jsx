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
import Fonts from "../../Utils/Font";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
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
      <View style={styles.subContainer}>
        <Text style={styles.orderText}>Mã đơn: {item?._id}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.orderText}>
            <AntDesign name="calendar" size={16} color={Color.PRIMARY} />{" "}
            {moment(item?.orderDate).format("DD/MM/YYYY")} lúc{" "}
            {moment(item?.orderDate).format("HH:mm")}
          </Text>
          <Text style={styles.orderText}>
            <FontAwesome5
              name="money-bill-alt"
              size={16}
              color={Color.PRIMARY}
            />{" "}
            {formatMoney(item?.total)}
          </Text>
        </View>

        <Text
          style={[
            {
              padding: 2,
              borderRadius: 5,
              fontSize: 14,
              overflow: "hidden",
              textAlign: "center",
            },
            item?.status === "completed"
              ? {
                  backgroundColor: Color.GREEN,
                  color: Color.LIGHT,
                  width: "30%",
                }
              : item?.status === "pending"
              ? {
                  backgroundColor: Color.RED,
                  color: Color.LIGHT,
                  width: "30%",
                }
              : {
                  color: Color.PRIMARY,
                  backgroundColor: Color.PRIMARY_LIGHT,
                  width: "30%",
                },
          ]}
        >
          {item?.status}
        </Text>
      </View>
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
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    gap: 8,
  },
  flatList: {
    width: "100%",
  },
  orderItem: {
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Color.PRIMARY,
    backgroundColor: Color.WHITE,
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.42,
    borderRadius: 10,
  },
  orderText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
    color: Color.PRIMARY,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 50,
  },
});

export default HistoryScreen;
