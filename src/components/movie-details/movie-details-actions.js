import axios from 'axios'

export const getFilm = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`;
    let res = await axios.get(url);
    let {data} = res;
    return data;
};


export const addFavorites = (film) => {
    return (d) => {
        d(
            {
                type: "ADD_FAVORITE",
                payload: film
            })
    }
}

export const removeFavorites = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "DELETE_FAVORITE",
                payload: film
            })
    }
}
