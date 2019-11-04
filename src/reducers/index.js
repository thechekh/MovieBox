import {combineReducers} from 'redux'

import genresReducer from './genres-reducer'
import filmsReducer from "./films-reducer";

export default combineReducers({
    genres: genresReducer,
    films: filmsReducer,
})