import { call, put, takeLatest } from "redux-saga/effects";

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
    const movie = yield call(instance.get, url);
    yield put(fetchMovieSuccess(movie.data));
  } catch (err) {
    const msg = "Failed Load Movie";
    yield put(fetchMovieFailure(msg));
  }
}

function* watchFetchMovieSaga() {
  yield takeLatest(Constants.MOVIE_FETCH, fetchMovie);
}

export default watchFetchMovieSaga;
