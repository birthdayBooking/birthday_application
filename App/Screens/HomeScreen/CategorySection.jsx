import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryData } from "../../redux/actions/categoryAction";
import Heading from "../../Components/Heading";
import Color from "../../Utils/Color";

export default function CategorySection({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  if (!categories) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={{ marginTop: 15 }}>
      <Heading text={"Phân loại"} isViewAll={true} />
      <FlatList
        data={categories.categories}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("party-list", {
                  categoryName: item.name,
                })
              }
            >
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item?.icon?.url }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <Text style={{ fontFamily: "Outfit-Medium", marginTop: 5 }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Color.LIGHT,
    padding: 17,
    borderRadius: 99,
  },
});
