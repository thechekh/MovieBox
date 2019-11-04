import {combineReducers} from 'redux'

import favoritesReducer from './favorites-reducer'
import genresReducer from './genres-reducer'
import filmsReducer from './films-reducer'
import movieReducer from './movie-reducer'

{/** REVIEW: объедени редюсеры favorites, films, movie */}

export default combineReducers({
    favorites: favoritesReducer,
    genres: genresReducer,
    films: filmsReducer,
    movie: movieReducer,

})
