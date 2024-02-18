import {
  GET_ALL_SLIDER_FAILURE,
  GET_ALL_SLIDER_SUCCESS,
} from "../actions/sliderAction";

const initialState = [];

export default function sliderActionForReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SLIDER_SUCCESS: {
      return {
        ...state,
        sliders: action.payload,
        error: null,
      };
    }
    case GET_ALL_SLIDER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
