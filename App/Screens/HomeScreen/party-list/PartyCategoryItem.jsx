import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Color from "../../../Utils/Color";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function PartyCategoryItem({ party, navigation, booking }) {
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("party-detail", {
          party: party,
        })
      }
    >
      <Image source={{ uri: party.images[0] }} style={styles.image} />

      <View style={styles.subContainer}>
        <Text
          style={{
            fontFamily: "Outfit-Regular",
            color: Color.GRAY,
            fontSize: 15,
          }}
        >
          {party?.contactPerson}
        </Text>
        <Text
          style={{
            fontFamily: "Outfit-Bold",
            fontSize: 19,
          }}
        >
          {party?.name}
        </Text>
        {!booking?.id ? (
          <Text
            style={{
              fontFamily: "Outfit-Regular",
              color: Color.GRAY,
              fontSize: 16,
            }}
          >
            <Ionicons name="location-sharp" size={20} color={Color.PRIMARY} />
            {party.address}
          </Text>
        ) : (
          <Text
            style={[
              {
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
                overflow: "hidden",
                alignItems: "flex-start",
              },
              booking?.bookingStatus === "Conpleted"
                ? { backgroundColor: Color.GREEN, color: Color.GREEN_LIGHT }
                : booking.bookingStatus === "Canceled"
                ? { backgroundColor: Color.RED, color: Color.RED_LIGHT }
                : {
                    color: Color.PRIMARY,
                    backgroundColor: Color.PRIMARY_LIGHT,
                  },
            ]}
          >
            {booking?.bookingStatus}
          </Text>
        )}

        {booking?.id ? (
          <Text
            style={{ fontFamily: "outfit", color: Color.GRAY, fontSize: 16 }}
          >
            <AntDesign
              name="calendar"
              size={24}
              color={Color.PRIMARY}
              style={{ marginRight: 15 }}
            />
            {booking.date} at {booking.time}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

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
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
