import Constants from "../utils/constants";

const initialState = {
  favorites: []
};
const {
  GET_FILMS_REQUEST,
  GET_FILMS_SUCCESS,
  GET_FILMS_FAILURE,
  DELETE_FAVORITE,
  ADD_FAVORITE,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE
} = Constants;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FILMS_REQUEST:
      return { ...state, loading: true };
    case GET_FILMS_SUCCESS:
      return { ...state, ...payload, loading: false };
    case GET_FILMS_FAILURE:
      return { ...state, loading: false, errorMessage: payload };
    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== payload)
      };
    case ADD_FAVORITE:
      return { ...state, favorites: [payload, ...state.favorites] };
    case GET_MOVIE_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_SUCCESS:
      return { ...state, payload, loading: false };
    case GET_MOVIE_FAILURE:
      return { ...state, loading: false, errorMessage: payload };

    default:
      return state;
  }
};
