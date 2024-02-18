import { gql } from "graphql-request";

export const bookingPartyQuery = (bookingData) => {
  gql`
mutation createBooking {
createBooking(

    data: {
    bookingStatus: Booked,
    party: { connect: { id: "` +
    bookingData.partyId +
    `" }},
    time: "` +
    bookingData.time +
    `",
    date: "` +
    bookingData.date +
    `",
    userEmail: "` +
    bookingData.userEmail +
    `",
    userName: "` +
    bookingData.userName +
    `",
    
    }) {
        id}
    publishManyBookings(to: PUBLISHED) {
        count
    }
}
`;
};

export const getAllBookingByEmailQuery = (email) => {
  gql`
    query MyQuery {
    bookings(orderBy: updatedAt_DESC, where: { userEmail: "` +
    email +
    `" }) {
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
