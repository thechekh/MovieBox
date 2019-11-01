import axios from "axios";


const key = process.env.REACT_APP_API_KEY;

export const getFilms = (page = 1) => {
    return async (dispatch) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=${key}`;
            const fullUrl = `${url}&page=${page}`;
            const films = await axios.get(fullUrl)
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
