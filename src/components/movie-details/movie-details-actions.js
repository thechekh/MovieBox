/** Review: в идеале все файлы с экшенами положить в папку src/actions **/

import instance from "../../utils/axios-config";
import Constants from "../../utils/constants";

const {
  DELETE_FAVORITE,
  ADD_FAVORITE,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE
} = Constants;

/** Review: можно тут упростить запись export const getFilm => id => async dispatch => **/
export const getFilm = id => {
  return async dispatch => {
    dispatch({
      type: GET_MOVIE_REQUEST
    });
    try {
      const url = `movie/${id}`;
      const res = await instance.get(url);

      const { data } = res;
      dispatch({
        type: GET_MOVIE_SUCCESS,
        payload: data
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: GET_MOVIE_FAILURE,
        payload: e
      });
    }
  };
};

/** Review: тоже упрости **/
export const addFavorite = film => {
  return dispatch => {
    dispatch({
      type: ADD_FAVORITE,
      payload: film
    });
  };
};

/** Review: тоже упрости **/
export const removeFavorite = film => {
  return dispatch => {
    dispatch({
      type: DELETE_FAVORITE,
      payload: film
    });
  };
};
