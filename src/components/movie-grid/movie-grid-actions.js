import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

/*export const getsGenres = () => {
    console.log('f1');
    return (d) => {
        debugger
        console.log('re444re')
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`)
            .then(res => res.data)
            .then(data => d(
                {
                    type: "SET_GENRES",
                    payload: data,
                })
                , (err) => console.log(err))
    }
};*/
export const getsGenres = () => {
    return (d) => {
        console.log('12')
        d(
            {
                type: "ADD_FAVORITE",
                payload: 2
            })
    }
};
export const gets1Genres = () => {
    return (d) => {
        console.log('12')
        d(
            {
                type: "ADD_FAVORITE",
                payload: 2
            })
    }
};


export const getFilms = async (page = 1, url = `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=${key}`) => {
    const fullUrl = `${url}&page=${page}`;
    let res = await axios.get(fullUrl);
    let {data} = res;
    return data;
};





