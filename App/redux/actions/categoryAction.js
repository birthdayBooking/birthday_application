import GlobalApi from "../../GraphQL/GlobalApi";

export const GET_ALL_CATEGORY_SUCCESS = "GET_ALL_CATEGORY_SUCCESS";
export const GET_ALL_CATEGORY_FAILURE = "GET_ALL_CATEGORY_FAILURE";

export const getCategorySuccess = (categories) => ({
  type: GET_ALL_CATEGORY_SUCCESS,
  payload: categories,
});

export const getCategoryFailure = (error) => ({
  type: GET_ALL_CATEGORY_FAILURE,
  payload: error,
});

export const fetchCategoryData = () => async (dispatch) => {
  try {
    const result = await GlobalApi.getCategories();
    dispatch(getCategorySuccess(result));
  } catch (error) {
    dispatch(getCategoryFailure(error));
  }
};
