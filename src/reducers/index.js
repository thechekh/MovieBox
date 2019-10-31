import {combineReducers} from 'redux'

import favoritesReducer from './favorites-reducer'
import genresReducer from './genres-reducer'
import filmsReducer from './films-reducer'

export default combineReducers({
    favorites: favoritesReducer,
    genres: genresReducer,
    films: filmsReducer,
})
