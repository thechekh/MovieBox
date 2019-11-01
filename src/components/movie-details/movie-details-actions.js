import instance from "../../utils/axios-config";

export const getFilm = async (id) => {
    try {
        const url = `movie/${id}?`;
      const res = await instance.get(url);
        const {data} = res;
        return data;
    } catch (e) {
        console.error(e);
    }
};
export const addFavorite = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "ADD_FAVORITE",
                payload: film
            })
    }
};
export const removeFavorite = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "DELETE_FAVORITE",
                payload: film
            })
    }
};

