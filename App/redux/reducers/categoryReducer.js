import {
  GET_ALL_CATEGORY_FAILURE,
  GET_ALL_CATEGORY_SUCCESS,
} from "../actions/categoryAction";

const initialState = [];

export default function categoryActionForReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    }
    case GET_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
