import {createStore, applyMiddleware,compose} from 'redux'
import reducer from '../reducers/index'

import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            loggerMiddleware,
        ))
);export default store