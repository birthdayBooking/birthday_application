import {
  GET_ALL_PARTY_SUCCESS,
  GET_ALL_PARTY_FAILURE,
  GET_ALL_PARTY_BY_CATEGORY_NAME_SUCCESS,
} from "../actions/partyAction";

const initialState = [];

export default function partyActionForReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PARTY_SUCCESS: {
      return {
        ...state,
        parties: action.payload,
        error: null,
      };
    }
    case GET_ALL_PARTY_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case GET_ALL_PARTY_BY_CATEGORY_NAME_SUCCESS: {
      return {
        ...state,
        partiesCategory: action.payload,
        error: null,
      };
    }
    default:
      return state;
  }
}
