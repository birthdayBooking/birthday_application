import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PartyCategorySection from "../Screens/HomeScreen/party-list/PartyCategorySection";
import PartyDetailSection from "../Screens/HomeScreen/party-detail/PartyDetailSection";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home-main" component={HomeScreen} />
      <Stack.Screen name="party-list" component={PartyCategorySection} />
      <Stack.Screen name="party-detail" component={PartyDetailSection} />
    </Stack.Navigator>
  );
}
