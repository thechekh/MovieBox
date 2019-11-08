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
    const url = `movie/now_playing`;
    const films = yield call(() => {
      return instance
        .get(url, {
          params: {
            page
          }
        })
        .then(res => res.data);
    });
    films.results = camelcaseKeys(films.results);
    yield put(fetchFilmsSuccess(films));
  } catch (err) {
    const msg = "Failed Load Films";
    yield put(fetchFilmsFailure(msg));
  }
}

function* watchFetchFilmsSaga() {
  yield takeLatest(Constants.FILMS_FETCH, fetchFilms);
}

export default watchFetchFilmsSaga;
