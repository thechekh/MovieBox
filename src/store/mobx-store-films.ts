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

export interface IFilmsStore {
  films: TFilms;
  loading: boolean;
  fetchFilms: (page: number) => void;
}

class FilmsStore implements IFilmsStore {
  @observable
  films = [] as any;

  @observable
  loading = true;

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
      this.films = camelcaseKeys(movies.data);
    } catch (err) {
      const msg = "Failed Load data, error";
      // eslint-disable-next-line no-console
      console.log(msg, err);
    } finally {
      this.loading = false;
    }
  };
}

const filmsStore = new FilmsStore();
export default filmsStore;
