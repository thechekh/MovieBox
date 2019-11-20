import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import { TMovie } from "./mobx-store-movie";

export type TFilms = {
  dates: string;
  page: number;
  results: Array<TMovie>;
  totalPages: number;
  totalResults: number;
};

class FilmsStore {
  @observable
  films: TFilms | null = null;

  @observable
  loading: boolean = true;

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
      // @ts-ignore
      this.films = camelcaseKeys(films.data);
    } finally {
      this.loading = false;
    }
  };
}

export default FilmsStore;
