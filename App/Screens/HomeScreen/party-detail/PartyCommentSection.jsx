import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Heading from "../../../Components/Heading";
import Color from "../../../Utils/Color";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

export default function PartyCommentSection({ comments, showModalReview }) {
  return (
    <>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={() => showModalReview()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Outfit-Medium",
          }}
        >
          Quay lại
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {comments?.map((comment, index) => (
          <View key={index}>
            <View style={styles.commentContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: "https://s.hdnux.com/photos/51/23/24/10827008/4/1200x0.jpg",
                  }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.commentContent}>
                <Text style={styles.userName}>{comment.customerId.name}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
                <Text style={styles.commentTime}>
                  {moment(comment.createdAt).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {},
  commentTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});
