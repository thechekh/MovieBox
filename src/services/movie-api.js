import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
export const getFilms = async (page=1, url = `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=${key}`) => {
    const fullUrl = `${url}&page=${page}`;
    let res = await axios.get(fullUrl);
    let {data} = res;
    return data;
};
export const getGenres = async (url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`) => {
    let res = await axios.get(url);
    let {data} = res;
    return data;
};




