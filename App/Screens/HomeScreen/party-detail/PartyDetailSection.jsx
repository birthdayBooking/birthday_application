import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Color from "../../../Utils/Color";
import Heading from "../../../Components/Heading";
import PartyPhotoSection from "./PartyPhotoSection";
import PartyAboutMeSection from "./PartyAboutMeSection";
import BookingModal from "./BookingModal";

export default function PartyDetailSection({ navigation }) {
  const param = useRoute().params;
  const [party, setParty] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    param && setParty(param.party);
  }, [param]);
  const onMessageBtnClick = () => {
    Linking.openURL(
      "mailto:" +
        party?.email +
        "?subject= I am looking for your Service&body=Hi There,"
    );
  };
  return (
    <View>
      <ScrollView style={{ height: "90%" }}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Image
          source={{ uri: party?.images[0]?.url }}
          style={{ width: "100%", height: 300 }}
        />
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
            {party?.name}
          </Text>
          <View style={styles.subContainer}>
            <Text
              style={{
                fontFamily: "Outfit-Medium",
                fontSize: 20,
                color: Color.PRIMARY,
              }}
            >
              {party?.contactPerson}
            </Text>
            <Text
              style={{
                color: Color.PRIMARY,
                backgroundColor: Color.PRIMARY_LIGHT,
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
                overflow: "hidden",
              }}
            >
              {party?.category?.name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Outfit-Regular",
              color: Color.GRAY,
            }}
          >
            <Ionicons name="location-sharp" size={24} color={Color.PRIMARY} />
            {party?.address}
          </Text>
          {/* Horizontal Line*/}
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Color.GRAY,
              marginTop: 20,
              marginBottom: 20,
            }}
          ></View>
          {/*  About Me Section*/}
          <View>
            <PartyAboutMeSection party={party} />
          </View>
          {/* Horizontal Line*/}
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Color.GRAY,
              marginTop: 20,
              marginBottom: 20,
            }}
          ></View>
          <PartyPhotoSection party={party} />
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.messageBtn}
          onPress={() => onMessageBtnClick()}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Outfit-Medium",
              color: Color.PRIMARY,
              fontSize: 18,
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingBtn}
          onPress={() => setShowModal(true)}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Outfit-Medium",
              color: Color.WHITE,
              fontSize: 18,
            }}
          >
            Booking
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={showModal}>
        <BookingModal
          partyId={party?.id}
          showModal={() => setShowModal(!showModal)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 8,
    gap: 8,
  },
});
