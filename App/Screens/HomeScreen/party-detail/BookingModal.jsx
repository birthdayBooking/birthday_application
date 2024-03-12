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
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../../Utils/Color";
import Heading from "../../../Components/Heading";
import { useDispatch } from "react-redux";
import { performBooking } from "../../../redux/actions/bookingAction";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import moment from "moment/moment";
export default function BookingModal({ partyId, showModal }) {
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    Toast.show({
      type: "success",
      text1: "Please select date and time, Thank you! 👋",
    });
    if (!selectedDate || !selectedTime) {
      return;
    }
    const bookingData = {
      partyId: partyId,
      time: selectedTime,
      date: moment(selectedDate).format("DD-MM-yyyy"),
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      // note: note,
    };
    console.log(bookingData);

    dispatch(performBooking(bookingData));
    Toast.show({
      type: "success",
      text1: "Booking Created Successfully 👋",
    });
    showModal();
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

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{ padding: 20, marginTop: 10, marginBottom: 20, height: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            minDate={Date.now()}
            todayBackgroundColor={Color.BLACK}
            todayTextStyle={{ color: Color.WHITE }}
            selectedDayColor={Color.PRIMARY}
            selectedDayTextColor={Color.WHITE}
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

        {/* Confirm Button  */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.confirmBtn}>Confirm & Booking</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
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
