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
  const [partyByCategories, setPartyByCategories] = useState([]);

  useEffect(() => {
    fetchPartyCategoryApi();
  }, []);

  const fetchPartyCategoryApi = async () => {
    // const url = `https://birthday-backend-8sh5.onrender.com/api/v1/parties/${param?.categoryName}`
    // console.log(url)
    try {
      const response = await fetch(
        `https://birthday-backend-8sh5.onrender.com/api/v1/parties/${param.categoryName}`
      );
      const result = await response.json();
      setPartyByCategories(result);
      setShowUI(true)
    } catch (error) {
      console.log(error);
    }
  };

 
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
      <PageHeading title={param?.categoryName + " Parties"} />
      {partyByCategories.length > 0 ? (
        <FlatList
          style={{ marginTop: 15 }}
          data={partyByCategories}
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
