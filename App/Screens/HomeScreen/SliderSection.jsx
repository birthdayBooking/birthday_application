import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderData } from "../../redux/actions/sliderAction";
import Heading from "../../Components/Heading";
import { useEffect } from "react";

export default function SliderSection() {
  const dispatch = useDispatch();
  const sliders = useSelector((state) => state.slider.sliders);
  const error = useSelector((state) => state.slider.error);

  useEffect(() => {
    dispatch(fetchSliderData());
  }, [dispatch]);

  if (!sliders) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <FlatList
        data={sliders.sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20 }}>
            <Image source={{ uri: item?.image?.url }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "Outfit-Medium",
    marginBottom: 10,
  },
  image: {
    width: 270,
    height: 150,
    borderRadius: 20,
    objectFit: "contain",
  },
});
