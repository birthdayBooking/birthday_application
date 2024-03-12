import { FlatList, Text, View } from "react-native";
import PageHeading from "../../Components/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllBookingByEmail } from "../../redux/actions/bookingAction";
import { useUser } from "@clerk/clerk-expo";
import PartyCategoryItem from "../HomeScreen/party-list/PartyCategoryItem";
export default function BookingScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const bookings = useSelector((state) => state.booking.booking);
  const { user } = useUser();
  useEffect(() => {
    dispatch(fetchAllBookingByEmail(user?.primaryEmailAddress.emailAddress));
    setLoading(true);
  }, [dispatch]);

  return (
    <View style={{ padding: 20 }}>
      <PageHeading title={"My Bookings"} />
      <View style={{ marginTop: 30 }}>
        <FlatList
          refreshing={loading}
          data={bookings?.bookings}
          renderItem={({ item, index }) => (
            <PartyCategoryItem
              party={item?.party}
              booking={item}
            ></PartyCategoryItem>
          )}
        />
      </View>
    </View>
  );
}
