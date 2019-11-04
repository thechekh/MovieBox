import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

instance.interceptors.request.use(function (config) {
    {/** REVIEW: подумай как это можно сделать без модификации строчки напрямую. axios позволяет это сделать */}
    config.url = `${config.url}&api_key=${key}`;
    return config;
});

export default instance;
