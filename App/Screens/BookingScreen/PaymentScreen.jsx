import { Link, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { formatMoney } from "../../Utils/Common";
import Color from "../../Utils/Color";
import { Ionicons } from "@expo/vector-icons";

const PaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark-circle" size={150} color="green" />
      </View>
      <Text style={styles.message}>Đặt tiệc thành công!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("home-main")}
      >
        <Text style={styles.buttonText}>Quay về trang chính</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  successIcon: {
    marginBottom: 50,
  },
  message: {
    fontFamily: "Outfit-Medium",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Outfit-Medium",
    fontSize: 18,
    color: "#ffffff",
  },
});

export default PaymentScreen;
