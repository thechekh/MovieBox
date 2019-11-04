import instance from "../../../utils/axios-config";

export const getFilms = (page = 1) => {

    return async (dispatch) => {
        dispatch(
            {
                type: "GET_FILMS_REQUEST",
            });
        try {

            const url = `movie/now_playing?`;
            const films = await instance.get(url, {
                params: {
                    page: page,
                    /** language - статический параметр. Его можно добавить там же, где и api_key */
                    language: 'ru-RU',
                }
            })
                .then(res => res.data);
            dispatch(
                {
                    type: "GET_FILMS_SUCCESS",
                    payload: films,
                });

        } catch (e) {
            console.error(e);
            dispatch(
                {
                    type: "GET_FILMS_FAILURE",
                    payload:e,
                });
        }
    }
};
