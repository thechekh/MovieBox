import Constants from "../utils/constants";

const initialState = {
  favorites: []
};
const {
  FILMS_REQUEST,
  FILMS_SUCCESS,
  FILMS_FAILURE,
  DELETE_FAVORITE,
  ADD_FAVORITE,
  MOVIE_REQUEST,
  MOVIE_SUCCESS,
  MOVIE_FAILURE
} = Constants;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILMS_REQUEST:
      return { ...state, loading: true };
    case FILMS_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FILMS_FAILURE:
      return { ...state, loading: false, errorMessage: payload };
    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== payload)
      };
    case ADD_FAVORITE:
      return { ...state, favorites: [payload, ...state.favorites] };
    case MOVIE_REQUEST:
      return { ...state, loading: true };
    case MOVIE_SUCCESS:
      return { ...state, payload, loading: false };
    case MOVIE_FAILURE:
      return { ...state, loading: false, errorMessage: payload };

    default:
      return state;
  }
};
