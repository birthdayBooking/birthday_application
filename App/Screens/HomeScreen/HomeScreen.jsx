import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import HeaderSection from "./HeaderSection";
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import PartySection from "./PartySection";
import PartyCategorySection from "./party-list/PartyCategorySection";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <HeaderSection />
      <View style={{ padding: 20 }}>
        <SliderSection />
        <CategorySection navigation={navigation} />
        <PartySection />
        <PartyCategorySection />
      </View>
    </View>
  );
}
