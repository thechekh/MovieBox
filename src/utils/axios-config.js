import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

instance.interceptors.request.use(function (config) {
    config.params = {
        ...config.params,
        api_key: key,
        language: 'ru-RU',

    };
    return config;
});

export default instance;