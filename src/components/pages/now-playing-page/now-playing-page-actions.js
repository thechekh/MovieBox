import instance from "../../../utils/axios-config";

export const getFilms = (page = 1) => {
  return async dispatch => {
    dispatch({
      type: "GET_FILMS_REQUEST"
    });
    try {
      const url = `movie/now_playing?`;
      const res = await instance.get(url, {
        params: {
          page
        }
      });
      const { data } = res;
      dispatch({
        type: "GET_FILMS_SUCCESS",
        payload: data
      });
    } catch (e) {
      dispatch({
        type: "GET_FILMS_FAILURE",
        payload: e
      });
    }
  };
};
