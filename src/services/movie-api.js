import axios from "axios";

export const getFilms = async (page, url = `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`) => {
    const fullUrl = `${url}&page=${page}`;
    let res = await axios.get(fullUrl);
    let {data} = res;
    return data;
};
export const getGenres = async (url = "https://api.themoviedb.org/3/genre/movie/list?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US") => {
    let res = await axios.get(url);
    let {data} = res;
    return data;
};




