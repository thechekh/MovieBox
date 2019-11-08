import { put, call, takeLatest } from "redux-saga/effects";
import instance from "../utils/axios-config";
import Constants from "../utils/constants";
import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure
} from "../actions/genres-actions";

function* fetchGenres() {
  try {
    yield put(fetchGenresRequest());
    const genres = yield call(() => {
      return instance.get("genre/movie/list").then(res => res.data);
    });
    yield put(fetchGenresSuccess(genres));
  } catch (err) {
    const msg = "Failed Load Genres";
    yield put(fetchGenresFailure(msg));
  }
}

function* watchFetchGenresSaga() {
  yield takeLatest(Constants.GENRES_FETCH, fetchGenres);
}

export default watchFetchGenresSaga;
