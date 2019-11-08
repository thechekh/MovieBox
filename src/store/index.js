import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga";

import reducer from "../reducers/index";

import watchFetchGenresSaga from "../sagas/genres-saga";
import watchFetchMovieSaga from "../sagas/movie-details-saga";
import watchFetchFilmsSaga from "../sagas/now-playing-page-saga";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, reducer);

const loggerMiddleware = createLogger();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(loggerMiddleware, sagaMiddleware))
);
sagaMiddleware.run(watchFetchGenresSaga);
sagaMiddleware.run(watchFetchMovieSaga);
sagaMiddleware.run(watchFetchFilmsSaga);
const persistor = persistStore(store);
export { store, persistor };
