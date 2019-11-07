import instance from "../utils/axios-config";
import Constants from "../utils/constants";

const { SET_GENRES } = Constants;
const getsGenres = () => async dispatch => {
  try {
    const genres = await instance.get(`genre/movie/list`);
    dispatch({
      type: SET_GENRES,
      payload: genres.data
    });
    return genres;
  } catch (e) {
    return e;
  }
};

export default getsGenres;
