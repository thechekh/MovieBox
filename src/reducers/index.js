import {combineReducers} from 'redux'

import favoritesReducer from './favorites-reducer'
import genresReducer from './genres-reducer'

export default combineReducers({
    favorites: favoritesReducer,
    genres: genresReducer,

})