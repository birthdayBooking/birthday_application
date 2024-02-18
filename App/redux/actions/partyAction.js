import GlobalApi from "../../GraphQL/GlobalApi";

export const GET_ALL_PARTY_SUCCESS = "GET_ALL_PARTY_SUCCESS";
export const GET_ALL_PARTY_FAILURE = "GET_ALL_PARTY_FAILURE";
export const GET_ALL_PARTY_BY_CATEGORY_NAME_SUCCESS =
  "GET_ALL_PARTY_BY_CATEGORY_NAME_SUCCESS";

const getPartySuccess = (party) => ({
  type: GET_ALL_PARTY_SUCCESS,
  payload: party,
});

const getPartyByCategoryNameSuccess = (party) => ({
  type: GET_ALL_PARTY_BY_CATEGORY_NAME_SUCCESS,
  payload: party,
});

export const getPartyError = (error) => ({
  type: GET_ALL_PARTY_FAILURE,
  payload: error,
});

export const fetchPartyData = () => async (dispatch) => {
  try {
    const result = await GlobalApi.getParties();
    dispatch(getPartySuccess(result));
  } catch (error) {
    dispatch(getPartyError(error));
  }
};

export const fetchPartyByCategoryNameData =
  (categoryName) => async (dispatch) => {
    const result = await GlobalApi.getPartiesByCategoryName(categoryName);
    dispatch(getPartyByCategoryNameSuccess(result));
  };
