import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import HeaderSection from "./HeaderSection";
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import PartySection from "./PartySection";
import { useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { UserType } from "../../context/UserContext";

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
