import axios from 'axios'

const key = process.env.REACT_APP_API_KEY;

export const getFilm = async (id) => {

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
    let res = await axios.get(url);
    let {data} = res;
    return data;
};
export const addFavorites = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "ADD_FAVORITE",
                payload: film
            })
    }
};
export const removeFavorites = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "DELETE_FAVORITE",
                payload: film
            })
    }
};

