import { gql } from "graphql-request";

export const bookingPartyQuery = (bookingData) => {
  gql`
mutation createBooking {
createBooking(
    data: {
        time: "${bookingData.time}"
        date: "${bookingData.date}"
        userEmail: "${bookingData.userEmail}"
        userName: "${bookingData.userName}"
        bookingStatus: Booked
        party: { connect: { id: "${bookingData.partyId}" } }
    }
      ) {
        id}
    publishManyBookings(to: PUBLISHED) {
        count
    }
}
`;
};

export const getAllBookingByEmailQuery = (email) => {
  return gql`
    query getAllBookingByEmail {
    bookings(orderBy: updatedAt_DESC, where: { userEmail: "${email}"}) {
        time
        userEmail
        userName
        bookingStatus
        date
        id
        party {
          id
          images {
            url
          }
          name
          address
          contactPerson
          email
        }
      }
    }
  `;
};
