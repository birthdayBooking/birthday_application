import { View, ActivityIndicator, FlatList, Text } from "react-native";
import React, { useEffect } from "react";
import Heading from "../../Components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartyData } from "../../redux/actions/partyAction";
import PartyItem from "./PartyItem";

export default function PartySection() {
  const dispatch = useDispatch();
  const parties = useSelector((state) => state.party.parties);
  const error = useSelector((state) => state.party.error);

  useEffect(() => {
    dispatch(fetchPartyData());
  }, [dispatch]);

  if (!parties) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ marginTop: 15 }}>
      <Heading text={"Popular Party"} isViewAll={true} />
      <FlatList
        data={parties.parties}
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
