import {
  BOOKING_FAILURE,
  BOOKING_SUCCESS,
  GET_ALL_BOOKING_BY_EMAIL,
} from "../actions/bookingAction";

const initialState = {
  bookingDetails: null,
  error: null,
};

export default bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS:
      return {
        ...state,
        bookingDetails: action.payload,
        error: null,
      };
    case BOOKING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_BOOKING_BY_EMAIL: {
      return {
        ...state,
        booking: action.payload,
        error: null,
      };
    }
    default:
      return state;
  }
};
