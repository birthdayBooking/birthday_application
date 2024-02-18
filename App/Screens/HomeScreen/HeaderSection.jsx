import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Color from "../../Utils/Color";
import Font from "../../Utils/Font";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function HeaderSection() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const { user, isLoading } = useUser();
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Profile Section*/}
        <View style={styles.profileMainContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImg} />
            <View>
              <Text style={{ color: Color.WHITE }}>Welcome,</Text>
              <Text
                style={{
                  color: Color.WHITE,
                  fontSize: 20,
                  fontFamily: Font.MEDIUM,
                }}
              >
                {user.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome name="calendar" size={27} color="white" />
        </View>
        {/* Searchbar Section*/}
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search the name restaurant"
            style={styles.textInput}
          />
          <AntDesign
            name="search1"
            style={styles.searchBtn}
            size={25}
            color={Color.PRIMARY}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImg: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
    fontFamily: Font.REGULAR,
  },
  searchBtn: {
    borderRadius: 8,
    backgroundColor: Color.WHITE,
    padding: 8,
    overflow: "hidden",
  },
});
