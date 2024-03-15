import { View, ActivityIndicator, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartyData } from "../../redux/actions/partyAction";
import PartyItem from "./PartyItem";

export default function PartySection() {
  const dispatch = useDispatch();
  // const parties = useSelector((state) => state.party.parties);
  // const error = useSelector((state) => state.party.error);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetchPartyApi();
  }, []);

  const fetchPartyApi = async () => {
    try {
      const response = await fetch(
        "https://birthday-backend-8sh5.onrender.com/api/v1/parties"
      );
      const result = await response.json();
      setParties(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (!parties) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ marginTop: 15 }}>
      <Heading text={"Popular Party"} isViewAll={true} />
      <FlatList
        data={parties}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <PartyItem item={item} />
          </View>
        )}
      />
    </View>
  );
}
