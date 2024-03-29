import * as Linking from "expo-linking";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Modal,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../../Utils/Color";
import Heading from "../../../Components/Heading";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import moment from "moment/moment";
import { UserType } from "../../../context/UserContext";
import BookingServiceScreen from "../../BookingScreen/BookingServiceModal";

export default function BookingModal({ partyId, showModal, navigation }) {
  const [services, setServices] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().add(2, "days").toDate()
  );
  const [openPopUp, setOpenPopUp] = useState(false);
  const [note, setNote] = useState();
  const [selectedServices, setSelectedServices] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const minDateCanBooking = moment().add(2, "days").toDate();
  const dispatch = useDispatch();

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
        await AsyncStorage.removeItem("order");
        navigation.navigate("payment");
      }
    }
  };

  useEffect(() => {
    fetchServices();
    Linking.addEventListener("url", handleDeepLinking);
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(
        "https://birthday-backend-8sh5.onrender.com/api/v1/services"
      );
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        Toast.show({
          type: "warning",
          text1: "Please select date and time. 👋",
        });
        return;
      }
      const total = selectedServices.reduce((totalAmount, serviceId) => {
        const SelectServicePrice = services.find((service) => {
          return service._id === serviceId;
        });
        return SelectServicePrice
          ? totalAmount + SelectServicePrice.price
          : totalAmount;
        // return totalAmount
      }, 0);

      const totalForBooking = total + partyId.price;
      // Tạo bookingData từ các giá trị đã có
      const bookingData = {
        customerId: userId,
        partyId: partyId?._id,
        extraService: selectedServices,
        time: selectedTime,
        total: totalForBooking,
        orderDate: selectedDate,
        notes: note,
        address: partyId?.address,
      };

      const orderData = {
        orderDate: selectedDate,
        time: selectedTime,
        address: partyId?.address,
      };

      const orderAvailible = await fetch(
        "https://birthday-backend-8sh5.onrender.com/api/v1/orders/check-availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const responseOrder = await orderAvailible.json();
      if (responseOrder.available) {
        const response = await fetch(
          "https://birthday-backend-8sh5.onrender.com/api/v1/orders/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          }
        );
        const responseApi = await response.json();

        await AsyncStorage.setItem("order", responseApi._id);

        const supported = await Linking.canOpenURL(
          `https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url?amount=${totalForBooking}&mobileUrl=${mobileUrl}`
        );
        if (supported) {
          await Linking.openURL(
            `https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url?amount=${totalForBooking}&mobileUrl=${mobileUrl}`
          );
        } else {
          Alert.alert(
            `Don't know how to open this URL: ${"https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url"}`
          );
        }

        Toast.show({
          type: "success",
          text1: "Booking Created Successfully. 👋",
        });
        showModal(); // Hiển thị modal (nếu cần)
      }
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi khi gọi API
      Toast.show({
        type: "error",
        text1: "Failed to process booking. Please try again later. 👋",
      });
    }
  };

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i += 2) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 7; i += 2) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  const handleCloseModal = (selectedServices) => {
    setSelectedServices(selectedServices);
    setOpenPopUp(!openPopUp);
  };

  return (
    <KeyboardAvoidingView
      style={{
        paddingVertical: 10,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 20,
        height: "100%",
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
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
            Quay lại
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Heading text="Thời gian diễn ra" />
        </View>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={340}
            minDate={minDateCanBooking}
            todayTextStyle={{ color: Color.WHITE }}
            selectedDayColor={Color.PRIMARY}
            selectedDayTextColor={Color.WHITE}
            selectedStartDate={selectedDate}
          />
        </View>

        {/* Time Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Giờ diễn ra"}></Heading>
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime === item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>

        {/* Service Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Chọn thêm dịch vụ lẻ"} />
          {/* Danh sách các dịch vụ lẻ */}
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => setOpenPopUp(!openPopUp)}
          >
            <Text style={styles.confirmBtn}>Thêm dịch vụ lẻ</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={openPopUp}>
          <BookingServiceScreen
            services={services}
            navigation={navigation}
            openPopUp={() => setOpenPopUp(!openPopUp)}
            onCloseModal={handleCloseModal}
            selectBefore={selectedServices}
          />
        </Modal>

        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Câu hỏi hoặc lời nhắn cho chúng tôi"} />
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            multiline={true}
            style={styles.noteTextArea}
            onChangeText={setNote}
          />
        </View>

        {/* Confirm Button  */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.confirmBtn}>Hoàn tất và đặt tiệc</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 18,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    overflow: "hidden",
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 18,
    color: Color.PRIMARY,
  },
  noteTextArea: {
    color: Color.BLACK,
    borderWidth: 1,
    borderRadius: 15,
    height: 150,
    textAlignVertical: "top",
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    borderColor: Color.PRIMARY,
    padding: 10,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "Outfit-Medium",
    fontSize: 17,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    padding: 13,
    borderRadius: 20,
    elevation: 2,
    overflow: "hidden",
    marginBottom: 15,
  },
});
