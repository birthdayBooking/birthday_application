import { useUser, useAuth } from "@clerk/clerk-expo";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Color from "../../Utils/Color";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const { user } = useUser();

  const navigation = useNavigation();
  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
    },
    {
      id: 2,
      name: "My Booking",
      icon: "bookmark-sharp",
    },
    {
      id: 3,
      name: "Contact Us",
      icon: "mail",
    },
    {
      id: 4,
      name: "Logout",
      icon: "log-out",
    },
  ];

  return (
    <View style={{}}>
      <View
        style={{ padding: 20, paddingTop: 30, backgroundColor: Color.PRIMARY }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Outfit-Bold",
            color: Color.WHITE,
          }}
        >
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            color: Color.PRIMARY,
          }}
        >
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 26,
              marginTop: 8,
              fontFamily: "Outfit-Medium",
              color: Color.WHITE,
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontFamily: "Outfit-Medium",
              color: Color.WHITE,
            }}
          >
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 80, alignItems: "center" }}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 40,
                justifyContent: "flex-start",
                paddingHorizontal: 80,
              }}
            >
              <Ionicons name={item.icon} size={44} color={Color.PRIMARY} />
              <Text style={{ fontFamily: "Outfit-Regular", fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
