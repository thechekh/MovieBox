import axios from "axios";

const key = "ebea8cfca72fdff8d2624ad7bbf78e4c";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

instance.interceptors.request.use(config => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: key,
      language: "ru-RU"
    }
  };
});

export default instance;
