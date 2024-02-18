import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartyByCategoryNameData } from "../../../redux/actions/partyAction";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PartyCategoryItem from "./PartyCategoryItem";
import Color from "../../../Utils/Color";
import PageHeading from "../../../Components/PageHeading";

export default function PartyCategorySection({ navigation }) {
  const dispatch = useDispatch();
  const [showUI, setShowUI] = useState(false);
  const param = useRoute().params;
  const parties = useSelector((state) => state.party.partiesCategory);

  useEffect(() => {
    dispatch(fetchPartyByCategoryNameData(param?.categoryName));

    const timer = setTimeout(() => {
      setShowUI(true);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  if (!showUI) {
    return (
      <ActivityIndicator
        style={{ marginTop: "70%" }}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={param?.categoryName} />
      {parties?.parties?.length > 0 ? (
        <FlatList
          style={{ marginTop: 15 }}
          data={parties?.parties}
          renderItem={({ item, index }) => (
            <PartyCategoryItem navigation={navigation} party={item} />
          )}
        />
      ) : (
        <Text
          style={{
            fontFamily: "Outfit-Medium",
            fontSize: 20,
            textAlign: "center",
            marginTop: "20%",
            color: Color.GRAY,
          }}
        >
          No Party in this category
        </Text>
      )}
    </View>
  );
}
