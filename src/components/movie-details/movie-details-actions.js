import axios from 'axios'

{/** REVIEW: вынеси в отдельный файл конфига с созданием axiosInstance */}
const key = process.env.REACT_APP_API_KEY;

export const getFilm = async (id) => {
    try {
        {/** REVIEW: api_key можно добавить через интерсепторы axios */}
        {/** REVIEW: так же в конфиги axios добавь https://api.themoviedb.org/3 как baseURL */}
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
        {/** REVIEW: почему let ? */}
        let res = await axios.get(url);
        let {data} = res;
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

