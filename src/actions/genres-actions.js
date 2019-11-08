import instance from "../utils/axios-config";
import Constants from "../utils/constants";

const {
  SET_GENRES,
  GENRES_REQUEST,
  GENRES_SUCCESS,
  GENRES_FAILURE,
  GENRES_FETCH
} = Constants;
const getsGenres = () => async dispatch => {
  try {
    const genres = await instance.get(`genre/movie/list`);
    dispatch({
      type: SET_GENRES,
      payload: genres.data
    });
    return genres;
  } catch (e) {
    return e;
  }
};

export const fetchGenresRequest = () => ({
  type: GENRES_REQUEST
});
export const fetchGenresSuccess = genres => ({
  type: GENRES_SUCCESS,
  payload: genres
});
export const fetchGenresFailure = err => ({
  type: GENRES_FAILURE,
  payload: err
});
export const fetchGenres = () => ({
  type: GENRES_FETCH
});
