import instance from "../../utils/axios-config";

export const getsGenres = () => {
  return async dispatch => {
    try {
      const genres = await instance.get(`genre/movie/list?`);
      dispatch({
        type: "SET_GENRES",
        payload: genres.data
      });
      return genres;
    } catch (e) {
      return e;
    }
  };
};
