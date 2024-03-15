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
      // Gửi selectedServices lên  để đặt hàng

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
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Outfit-Medium",
          }}
        >
          Services
        </Text>
      </TouchableOpacity>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleServiceSelection(item.id)}>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <Checkbox
                value={selectedServices.includes(item.id)}
                onValueChange={() => toggleServiceSelection(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitBooking}
      >
        <Text style={styles.submitButtonText}>Submit Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  servicePrice: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
