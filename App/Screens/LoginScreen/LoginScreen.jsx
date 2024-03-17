import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={styles.loginImage}
        source={require("./../../../assets/images/icon.png")}
      />
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 27,
            color: Color.WHITE,
            textAlign: "center",
          }}
        >
          Bắt đầu đặt tiệc{" "}
          <Text style={{ fontWeight: "bold" }}>
            Một bữa tiệc sinh nhật cho trẻ em
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: Color.WHITE,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Ứng dụng tốt nhất để bạn đặt một buổi tiệc cho con em của bạn
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Color.PRIMARY }}
          >
            Bắt đầu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Color.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Color.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 40,
  },
});
