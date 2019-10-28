import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

export const getsGenres = () => {
    return async (dispatch) => {
        try {
            const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`)
                .then(res => res.data);
            dispatch(
                {
                    type: "SET_GENRES",
                    payload: genres,
                });
            console.log(genres.genres,"GENRES");
            return genres
        } catch (error) {
            console.log(error);
        }
    }
};
export const getFilms = async (page = 1, url = `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=${key}`) => {
    const fullUrl = `${url}&page=${page}`;
    let res = await axios.get(fullUrl);
    let {data} = res;
    return data;
};





