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
} from "react-native";
import { formatMoney } from "../../Utils/Common";

const PaymentScreen = () => {
  const route = useRoute().params;
  const [bankCode, setBankCode] = useState("");
  const [language, setLanguage] = useState("vn");
  const amount = formatMoney(route.amount);

  const handleSubmit = async () => {
    if (!amount || !bankCode || !language) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const formatAmount = Number(amount.replace(/[^0-9\.]+/g, ""));
      const response = await fetch(
        "https://birthday-backend-8sh5.onrender.com/api/v1/payment/create_payment_url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total: formatAmount,
            bankCode,
            language,
          }),
        }
      );

      console.log("Request to PAYMENT:", response);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "Failed to process payment. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      <Text style={styles.input}>{amount}</Text>
      <Button
        title="Thanh toán qua VNPAYQR"
        onPress={() => setBankCode("VNPAYQR")}
        disabled={bankCode === "VNPAYQR"}
      />
      <Button
        title="Thanh toán qua ATM-Tài khoản ngân hàng nội địa"
        onPress={() => setBankCode("VNBANK")}
        disabled={bankCode === "VNBANK"}
      />
      <Button
        title="Thanh toán qua thẻ quốc tế"
        onPress={() => setBankCode("INTCARD")}
        disabled={bankCode === "INTCARD"}
      />
      <Button
        title="Chọn ngôn ngữ: Tiếng việt"
        onPress={() => setLanguage("vn")}
        disabled={language === "vn"}
      />
      <Button
        title="Chọn ngôn ngữ: Tiếng anh"
        onPress={() => setLanguage("en")}
        disabled={language === "en"}
      />
      <Button title="Thanh toán" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%",
  },
});

export default PaymentScreen;
