import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import { TMovie } from "./mobx-store-movie";

export type TFilms = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Array<TMovie>;
  totalPages: number;
  totalResults: number;
};

export interface IFilmsStore {
  films: TFilms;
  loading: boolean;
  error: boolean;
  fetchFilms: (page: number) => void;
}

class FilmsStore implements IFilmsStore {
  @observable
  films = {} as TFilms;

  @observable
  loading = true;

  error = false;

  @action
  fetchFilms = async (page: number) => {
    try {
      const url = "movie/now_playing";
      const movies = await instance.get(url, {
        params: {
          page
        }
      });
      movies.data.results = camelcaseKeys(movies.data.results);
      movies.data = camelcaseKeys(movies.data);
      this.films = movies.data;
    } catch (err) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  };
}

const filmsStore = new FilmsStore();
export default filmsStore;
