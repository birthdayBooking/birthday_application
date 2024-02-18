import GlobalApi from "../../GraphQL/GlobalApi";

export const GET_ALL_SLIDER_SUCCESS = "GET_ALL_SLIDER_SUCCESS";
export const GET_ALL_SLIDER_FAILURE = "GET_ALL_SLIDER_FAILURE";

export const getSliderSuccess = (sliders) => ({
  type: GET_ALL_SLIDER_SUCCESS,
  payload: sliders,
});

export const getSliderFailure = (error) => ({
  type: GET_ALL_SLIDER_FAILURE,
  payload: error,
});

export const fetchSliderData = () => async (dispatch) => {
  try {
    const result = await GlobalApi.getSliders();
    dispatch(getSliderSuccess(result)); // Dispatch action thành công
  } catch (error) {
    dispatch(getSliderFailure(error)); // Dispatch action thất bại
  }
};
