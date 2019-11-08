import { call, put, takeLatest } from "redux-saga/effects";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import Constants from "../utils/constants";
import {
  fetchMovieFailure,
  fetchMovieRequest,
  fetchMovieSuccess
} from "../actions/movie-details-actions";

function* fetchMovie(action) {
  try {
    yield put(fetchMovieRequest());
    const url = `movie/${action.payload}`;
    const movie = yield call(() => {
      return instance.get(url).then(res => res.data);
    });
    yield put(fetchMovieSuccess(movie));
  } catch (err) {
    const msg = "Failed Load Movie";
    yield put(fetchMovieFailure(msg));
  }
}

function* watchFetchMovieSaga() {
  yield takeLatest(Constants.MOVIE_FETCH, fetchMovie);
}

export default watchFetchMovieSaga;

/*export const addFavorite = film => dispatch => {
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
};*/
