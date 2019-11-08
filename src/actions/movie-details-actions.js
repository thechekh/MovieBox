import camelcaseKeys from "camelcase-keys";
import Constants from "../utils/constants";

const {
  DELETE_FAVORITE,
  ADD_FAVORITE,
  MOVIE_REQUEST,
  MOVIE_SUCCESS,
  MOVIE_FAILURE,
  MOVIE_FETCH
} = Constants;

export const fetchMovieRequest = id => ({
  type: MOVIE_REQUEST,
  payload: id
});
export const fetchMovieSuccess = movie => ({
  type: MOVIE_SUCCESS,
  payload: camelcaseKeys(movie)
});
export const fetchMovieFailure = err => ({
  type: MOVIE_FAILURE,
  payload: err
});
export const fetchMovie = id => ({
  type: MOVIE_FETCH,
  payload: id
});

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
