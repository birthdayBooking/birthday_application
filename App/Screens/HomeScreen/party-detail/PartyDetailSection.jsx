import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
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
import useConversation from "../../../zustand/useConversation";
import PartyCommentSection from "./PartyCommentSection";
import { useUser } from "@clerk/clerk-expo";

export default function PartyDetailSection({ navigation }) {
  const param = useRoute().params;
  const [party, setParty] = useState();
  const [showModal, setShowModal] = useState(false);
  const { setSelectedConversation } = useConversation();

  useEffect(() => {
    param && setParty(param.party);
  }, [param]);

  const onMessageBtnClick = () => {
    // Linking.openURL(
    //   "mailto:" +
    //     party?.email +
    //     "?subject= I am looking for your Service&body=Hi There,"
    // );
    navigation.navigate("chat-message");
    setSelectedConversation(party);
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[{ key: "content" }]} // Adding a single item to ensure FlatList renders
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: party?.images[0] }}
              style={{ width: "100%", height: 240 }}
            />
            <View style={styles.infoContainer}>
              <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
                {party?.name}
              </Text>
              <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
                {party?.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
              <View style={styles.subContainer}>
                <Text
                  style={{
                    fontFamily: "Outfit-Medium",
                    fontSize: 20,
                    color: Color.PRIMARY,
                  }}
                >
                  Host: {party?.hostId?.lastName}
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
                <Ionicons
                  name="location-sharp"
                  size={24}
                  color={Color.PRIMARY}
                />
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
              <View
                style={{
                  borderWidth: 0.4,
                  borderColor: Color.GRAY,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              ></View>  
              <Heading text={"Bình luận"}/>
              {party && party?.reviews.map((reviews, index) => {
              return (
                <View key={index}>
                    <PartyCommentSection comment={reviews}/>
                </View>
              );
            })}
            </View>
            {/* Horizontail line */}


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
                  Tin nhắn
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
                  Đặt Ngay
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={true}
      />
      <Modal animationType="slide" visible={showModal}>
        <BookingModal
          navigation={navigation}
          partyId={party}
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
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
    gap: 8,
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
  messageBtn: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
});
