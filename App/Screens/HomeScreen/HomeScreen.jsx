import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";
import HeaderSection from "./HeaderSection";
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import PartySection from "./PartySection";
import { useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { UserType } from "../../context/UserContext";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const { userId, setUserId } = useContext(UserType);

  const saveUser = async () => {
    try {
      const result = await fetch(
        "https://birthday-backend-8sh5.onrender.com/api/v1/accounts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user?.primaryEmailAddress.emailAddress,
            password: "meokai12345",
            passwordConfirm: "meokai12345",
            name: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            avatar: user?.profileImageUrl,
          }),
        }
      );

      const response = await result.json();
      setUserId(response._id);
    } catch (error) {
      console.log("Error saving user", error);
    }
  };

  useEffect(() => {
    //Save user when user login
    saveUser();
  }, [user]);

  const data = [
    { key: "slider" },
    { key: "categories" },
    { key: "party" },
    // Add more sections if needed
  ];
  const renderItem = ({ item }) => {
    switch (item.key) {
      case "slider":
        return <SliderSection />;
      case "categories":
        return <CategorySection navigation={navigation} />;
      case "party":
        return <PartySection />;
      // Add more cases if needed
      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderSection />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}
