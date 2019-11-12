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
    /** Review: выше писал */
    const movie = yield call(async () => {
      const res = await instance.get(url);
      return res.data;
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
