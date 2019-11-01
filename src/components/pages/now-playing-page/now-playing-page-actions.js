import instance from "../../../utils/axios-config";

export const getFilms = (page = 1) => {
    return async (dispatch) => {
        try {
            const url = `movie/now_playing?`;
            const films = await instance.get(url, {
                params: {
                    page: page,
                    language: 'ru-RU',
                }
            })
                .then(res => res.data);
            dispatch(
                {
                    type: "SET_FILMS",
                    payload: films,
                });
        } catch (e) {
            console.error(e);
        }
    }
};
