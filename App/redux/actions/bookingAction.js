import GlobalApi from "../../GraphQL/GlobalApi";

export const BOOKING_SUCCESS = "BOOKING_SUCCESS";
export const BOOKING_FAILURE = "BOOKING_FAILURE";
export const GET_ALL_BOOKING_BY_EMAIL = "GET_ALL_BOOKING_BY_EMAIL";
// Action Creators
const bookingSuccess = (bookingDetails) => ({
  type: BOOKING_SUCCESS,
  payload: bookingDetails,
});

const getAllBookingByEmail = (bookings) => ({
  type: GET_ALL_BOOKING_BY_EMAIL,
  payload: bookings,
});

const bookingFailure = (error) => ({
  type: BOOKING_FAILURE,
  payload: error,
});

export const performBooking = (bookingData) => async (dispatch) => {
  try {
    const response = GlobalApi.createBookingParty(bookingData);
    dispatch(bookingSuccess(response));
  } catch (error) {
    dispatch(bookingFailure(error.message));
  }
};

export const fetchAllBookingByEmail = (email) => async (dispatch) => {
  const result = await GlobalApi.getAllBookingByEmail(email);
  dispatch(getAllBookingByEmail(result));
};
