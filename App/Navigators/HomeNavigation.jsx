import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PartyCategorySection from "../Screens/HomeScreen/party-list/PartyCategorySection";
import PartyDetailSection from "../Screens/HomeScreen/party-detail/PartyDetailSection";
import PaymentScreen from "../Screens/BookingScreen/PaymentScreen";
import OrderDetailScreen from "../Screens/BookingScreen/OrderDetailScreen";
import ChatMessagesScreen from "../Screens/ChatScreen/ChatMessagesScreen";

export default function HomeNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
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
        name="orderDetail"
        component={OrderDetailScreen}
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
