import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PartyCategorySection from "../Screens/HomeScreen/party-list/PartyCategorySection";
import PartyDetailSection from "../Screens/HomeScreen/party-detail/PartyDetailSection";
import PaymentScreen from "../Screens/BookingScreen/PaymentScreen";
import ChatMessagesScreen from "../Screens/ChatScreen/ChatMessagesScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function HomeNavigation() {
  const Stack = createStackNavigator();
  const persistenceKey = "persistenceKey";
  const persistNavigationState = async (navState) => {
    try {
      await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
    } catch (err) {}
  };
  const loadNavigationState = async () => {
    const jsonString = await AsyncStorage.getItem(persistenceKey);
    return JSON.parse(jsonString);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      persistNavigationState={persistNavigationState}
      loadNavigationState={loadNavigationState}
    >
      <Stack.Screen
        name="home-main"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="party-list"
        component={PartyCategorySection}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="party-detail"
        component={PartyDetailSection}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="payment"
        component={PaymentScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="chat-message"
        component={ChatMessagesScreen}
        options={() => ({
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}
