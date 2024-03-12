import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import HeaderSection from "./HeaderSection";
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import PartySection from "./PartySection";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import AccountApi from "../../API/AccountApi";

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const saveUser = async () => {
    try {
      const data = {
        name: user?.fullName,
        email: user?.primaryEmailAddress.emailAddress,
        avatar: user?.profileImageUrl,
      };
      const result = await AccountApi.saveUser(data);
      console.log("result", result);
    } catch (error) {
      console.log("Error saving user", error);
    }
  };

  useEffect(() => {
    //Save user when user login
    saveUser();
  }, [user]);

  return (
    <View>
      <HeaderSection />
      <View style={{ padding: 20 }}>
        <SliderSection />
        <CategorySection navigation={navigation} />
        <PartySection />
      </View>
    </View>
  );
}
