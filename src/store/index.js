import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga";

import reducer from "../reducers/index";

import watchFetchGenresSaga from "../sagas/genres-saga";

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
const persistor = persistStore(store);
export { store, persistor };
