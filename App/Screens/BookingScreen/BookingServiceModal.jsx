import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../Utils/Color";
import Heading from "../../Components/Heading";
import { formatMoney } from "../../Utils/Common";
export default function BookingServiceScreen({
  services,
  submitService,
  navigation,
  openPopUp,
  onCloseModal,
  selectBefore,
}) {
  // const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isChecked, setChecked] = useState(false);
  // Set navigation options
  useEffect(() => {
    if (selectBefore.length > 0) {
      setSelectedServices(selectBefore);
    }
  }, [selectBefore]);

  const toggleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceId)) {
        return prevSelectedServices.filter((id) => id !== serviceId);
      } else {
        return [...prevSelectedServices, serviceId];
      }
    });
  };

  const handleSubmitBooking = async () => {
    try {
      onCloseModal(selectedServices);
    } catch (err) {
      console.error("Error while submitting booking:", err.message);
      // Xử lý lỗi tại đây nếu cần
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={() => openPopUp()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Heading text="Select Services" />
      </TouchableOpacity>
      <FlatList
        style={{ marginTop: 20 }}
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleServiceSelection(item.id)}>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{formatMoney(item.price)}</Text>
              <Checkbox
                color={Color.PRIMARY}
                value={selectedServices.includes(item.id)}
                onValueChange={() => toggleServiceSelection(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmitBooking}>
        <Text style={styles.submitButtonText}>Submit Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,

    // Div center
  },
  serviceName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  servicePrice: {
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: Color.WHITE,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
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
