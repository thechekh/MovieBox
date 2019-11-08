import camelcaseKeys from "camelcase-keys";
import Constants from "../utils/constants";

const {
  REMOVE_FAVORITE,
  ADD_FAVORITE,
  MOVIE_FETCH,
  MOVIE_REQUEST,
  MOVIE_SUCCESS,
  MOVIE_FAILURE
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

export const addFavorite = film => ({
  type: ADD_FAVORITE,
  payload: camelcaseKeys(film)
});

export const removeFavorite = id => ({
  type: REMOVE_FAVORITE,
  payload: id
});
