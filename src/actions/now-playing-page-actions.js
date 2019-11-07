import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import Constants from "../utils/constants";

const { GET_FILMS_REQUEST, GET_FILMS_SUCCESS, GET_FILMS_FAILURE } = Constants;
const getFilms = (page = 1) => async dispatch => {
  dispatch({
    type: GET_FILMS_REQUEST
  });
  try {
    const url = `movie/now_playing`;
    const res = await instance.get(url, {
      params: {
        page
      }
    });
    const { data } = res;
    data.results = camelcaseKeys(data.results);
    dispatch({
      type: GET_FILMS_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: GET_FILMS_FAILURE,
      payload: e
    });
  }
};
export default getFilms;
