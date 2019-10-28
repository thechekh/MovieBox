import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

export const getGenres = async (url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`) => {
    let res = await axios.get(url);
    let {data} = res;
    return data;
};




