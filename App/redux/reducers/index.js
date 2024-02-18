import { combineReducers } from "redux";
import sliderActionForReducer from "./sliderReducer";
import categoryActionForReducer from "./categoryReducer";
import partyActionForReducer from "./partyReducer";
import bookingReducer from "./bookingReducer";

const reducers = combineReducers({
  slider: sliderActionForReducer,
  category: categoryActionForReducer,
  party: partyActionForReducer,
  booking: bookingReducer,
});

export default (state, action) => reducers(state, action);
