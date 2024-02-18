import { View, Text, Image } from "react-native";
import React from "react";
import Heading from "../../../Components/Heading";
import { FlatList } from "react-native-gesture-handler";

export default function PartyPhotoSection({ party }) {
  return (
    <View>
      <Heading text={"Photos"} />
      <FlatList
        data={party?.images}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{
              width: "100%",
              flex: 1,
              height: 120,
              borderRadius: 15,
              margin: 7,
            }}
          />
        )}
      />
    </View>
  );
}
