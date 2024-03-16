import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import { useNavigation } from "@react-navigation/native";

export default function PartyItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("party-detail", {
          party: item,
        })
      }
    >
      <Image source={{ uri: item?.images[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontFamily: "Outfit-Medium" }}>
          {item?.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Outfit-Regular",
            color: Color.GRAY,
          }}
        >
          {item?.hostId?.lastName}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Outfit-Regular",
            padding: 3,
            color: Color.PRIMARY,
            backgroundColor: Color.PRIMARY_LIGHT,
            borderRadius: 3,
            overflow: "hidden",
            alignSelf: "flex-start",
            paddingHorizontal: 7,
          }}
        >
          {item?.category?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 7,
    display: "flex",
    gap: 3,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
});
