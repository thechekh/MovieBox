import { call, put, takeLatest } from "redux-saga/effects";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import Constants from "../utils/constants";
import {
  fetchFilmsFailure,
  fetchFilmsRequest,
  fetchFilmsSuccess
} from "../actions/now-playing-page-actions";

function* fetchFilms(action) {
  try {
    const page = action.payload;
    yield put(fetchFilmsRequest());
    const url = `movie/now_playing?page=${page}`;
    const films = yield call(instance.get, url);
    films.data.results = camelcaseKeys(films.data.results);
    yield put(fetchFilmsSuccess(films.data));
  } catch (err) {
    const msg = "Failed Load Films";
    yield put(fetchFilmsFailure(msg));
  }
}

function* watchFetchFilmsSaga() {
  yield takeLatest(Constants.FILMS_FETCH, fetchFilms);
}

export default watchFetchFilmsSaga;
