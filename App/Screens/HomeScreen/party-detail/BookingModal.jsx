import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../../Utils/Color";
import Heading from "../../../Components/Heading";
import { useDispatch } from "react-redux";
import { performBooking } from "../../../redux/actions/bookingAction";
import Toast from "react-native-toast-message";
import moment from "moment/moment";
import { UserType } from "../../../context/UserContext"
import { useNavigation } from "@react-navigation/native";


export default function BookingModal({ partyId, showModal, navigation }) {
  const [services, setServices] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().add(2, "days").toDate()
  );
  const [note, setNote] = useState();
  const { userId, setUserId } = useContext(UserType);
  const minDateCanBooking = moment().add(2, "days").toDate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    
    try {
      if (!selectedDate || !selectedTime) {
        Toast.show({
          type: "warning",
          text1: "Please select date and time. 👋",
        });
        return;
      }
      let totalAmount = 0;
      selectedServices.forEach(serviceId => {
        // Lấy giá của dịch vụ từ cơ sở dữ liệu hoặc từ thông tin được cung cấp
        const servicePrice = getServicePrice(serviceId); // Giả sử hàm này trả về giá của dịch vụ
        totalAmount += servicePrice;
      });
      // Tạo bookingData từ các giá trị đã có
      const bookingData = {
        customerId: userId,
        partyId: '65e043d9037d564848dc970f',
        extraService: selectedServices,
        time: selectedTime,
        total: totalAmount,
        orderDate: moment(selectedDate).format("DD-MM-yyyy"),
        notes: note,
      };
      console.log(bookingData)

      // Gửi dữ liệu bookingData lên API để tạo đơn hàng mới
      const response = await fetch('https://birthday-backend-8sh5.onrender.com/api/v1/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        console.log(response);
      }

      const responseData = await response.json();
      console.log('Response from API:', responseData);

      // Nếu tạo đơn hàng thành công, chuyển sang trang thanh toán
      navigation.navigate('payment');
      Toast.show({
        type: 'success',
        text1: 'Booking Created Successfully. 👋',
      });
      showModal(); // Hiển thị modal (nếu cần)
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi khi gọi API
      Toast.show({
        type: 'error',
        text1: 'Failed to process booking. Please try again later. 👋',
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

const handleSend = () =>{
  console.log("party-service")
  navigation.push(
    'party-service'
  )
  showModal()
}
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
            Booking
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Heading text="Select date you want" />
        </View>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={340}
            minDate={minDateCanBooking}
            // todayBackgroundColor={Color.BLACK}
            todayTextStyle={{ color: Color.WHITE }}
            selectedDayColor={Color.PRIMARY}
            selectedDayTextColor={Color.WHITE}
            selectedStartDate={selectedDate}
          />
        </View>

        {/* Time Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Slect Time Slot"}></Heading>
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
          <Heading text={"Select Additional Services"} />
          {/* Danh sách các dịch vụ lẻ */}
          {services.map((service) => (
            <View key={service._id} style={{ flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                value={selectedServices.includes(service._id)}
                onValueChange={() => handleServiceSelect(service._id)}
              />
              <Text>{service.name}</Text>
            </View>
          ))}
        </View>

        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note"} />
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            multiline={true}
            style={styles.noteTextArea}
            onChangeText={setNote}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => handleSend()}
        >
          <Text style={styles.confirmBtn}>Add Service</Text>
        </TouchableOpacity>


        {/* Confirm Button  */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.confirmBtn}>Confirm & Booking</Text>
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
  },
});