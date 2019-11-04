import instance from "../../utils/axios-config";

export const getFilm = (id) => {

    return async (dispatch) => {
        dispatch(
            {
                type: "GET_MOVIE_REQUEST",
            });
        try {

            const url = `movie/${id}`;
            console.log('url',url)
            const res = await instance.get(url);

            const {data} = res;
            dispatch(
                {
                    type: "GET_MOVIE_SUCCESS",
                    payload: data,
                });

        } catch (e) {
            console.error(e);
            dispatch(
                {
                    type: "GET_MOVIE_FAILURE",
                    payload:e,
                });
        }
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

