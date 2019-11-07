import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import Constants from "../utils/constants";

const {
  DELETE_FAVORITE,
  ADD_FAVORITE,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE
} = Constants;

export const getFilm = id => async dispatch => {
  dispatch({
    type: GET_MOVIE_REQUEST
  });
  try {
    const url = `movie/${id}`;
    const res = await instance.get(url);
    const { data } = res;
    dispatch({
      type: GET_MOVIE_SUCCESS,
      payload: camelcaseKeys(data)
    });
  } catch (e) {
    dispatch({
      type: GET_MOVIE_FAILURE,
      payload: e
    });
  }
};

export const addFavorite = film => dispatch => {
  dispatch({
    type: ADD_FAVORITE,
    payload: camelcaseKeys(film)
  });
};

export const removeFavorite = id => dispatch => {
  dispatch({
    type: DELETE_FAVORITE,
    payload: id
  });
};
