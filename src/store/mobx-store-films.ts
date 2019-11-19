import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

class FilmsStore {
  @observable
  films = null;

  @observable
  results = null;

  @observable
  loading = true;

  @action
  fetchFilms = async (page: number) => {
    try {
      const url = "movie/now_playing";
      const films = await instance.get(url, {
        params: {
          page
        }
      });

      films.data.results = camelcaseKeys(films.data.results);
      this.films = films.data;
      this.results = films.data.results;
    } finally {
      this.loading = false;
    }
  };
}
export default FilmsStore;
