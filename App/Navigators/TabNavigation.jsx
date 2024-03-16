import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import BookingScreen from "../Screens/BookingScreen/BookingScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import ChatsScreen from "../Screens/ChatScreen/ChatsScreen";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Color from "../Utils/Color";
import ChatMessagesScreen from "../Screens/ChatScreen/ChatMessagesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import HistoryScreen from "../Screens/BookingScreen/HistoryScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabNavigation() {
  const navigation = useNavigation();
  const CustomButton = (props) => {

    const { navigateName, screen } = props;

    const handlePress = () => {
      navigation.navigate(navigateName, { screen });
    };
    return <TouchableOpacity {...props} onPress={handlePress} />;
  };

  const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 15 }}>
      <FontAwesome6 name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );

  const ChatStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatsScreen}
        options={() => ({
          headerShown: true,
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="Messages"
        component={ChatMessagesScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
        }}
      />

    </Stack.Navigator>
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.PRIMARY,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="booking"
        component={BookingScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Booking
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="calendar-days" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
          <Tab.Screen
        name="history"
        component={HistoryScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              history
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatRoot"
        component={ChatStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Chat
            </Text>
          ),

          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,

          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="rocketchat" size={24} color="black" />
          ),
          tabBarButton: (props) => (
            <CustomButton {...props} navigateName="ChatRoot" screen="Chat" />
          ),
          tabBarStyle: {
            display: "none",
          },

        }}
      />
    </Tab.Navigator>
  );
}
