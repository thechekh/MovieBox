import Constants from "../utils/constants";

const {
  GENRES_FETCH,
  GENRES_REQUEST,
  GENRES_SUCCESS,
  GENRES_FAILURE
} = Constants;
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
