import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Heading from "../../../Components/Heading";
import Color from "../../../Utils/Color";

export default function PartyAboutMeSection({ party }) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <View>
      <Heading text={"About me"} />
      <Text
        style={{
          fontFamily: "Outfit-Regular",
          color: Color.GRAY,
          lineHeight: 28,
          fontSize: 16,
        }}
        numberOfLines={isReadMore ? 20 : 5}
      >
        {party?.about}
      </Text>
      <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
        <Text
          style={{
            color: Color.PRIMARY,
            fontSize: 16,
            fontFamily: "Outfit-Regular",
          }}
        >
          {isReadMore ? "Read Less" : "Read More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
