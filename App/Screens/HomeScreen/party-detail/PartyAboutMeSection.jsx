import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Heading from "../../../Components/Heading";
import Color from "../../../Utils/Color";

export default function PartyAboutMeSection({ party }) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <View>
      <Heading text={"Mô tả buổi tiệc"} />
      <Text
        style={{
          fontFamily: "Outfit-Regular",
          color: Color.GRAY,
          lineHeight: 28,
          fontSize: 16,
        }}
        numberOfLines={isReadMore ? 20 : 5}
      >
        {party?.mainDetail}
      </Text>
      {party?.perks.map((perk, index) => (
        <Text
          key={index}
          style={{
            fontFamily: "Outfit-Regular",
            color: Color.GRAY,
            lineHeight: 28,
            fontSize: 16,
          }}
        >
          {perk}
        </Text>
      ))}

      {/* <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
        <Text
          style={{
            color: Color.PRIMARY,
            fontSize: 16,
            fontFamily: "Outfit-Regular",
          }}
        >
          {isReadMore ? "Read Less" : "Read More"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}
