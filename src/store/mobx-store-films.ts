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
  films: TFilms | null;
  loading: boolean;
  fetchFilms: (page: number) => void;
}
class FilmsStore implements IFilmsStore {
  @observable
  films = null;

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
      // @ts-ignore
      this.films = camelcaseKeys(films.data);
    } catch (err) {
      const msg = "Failed Load data, error";
      console.log(msg, err);
    } finally {
      this.loading = false;
    }
  };
}
const filmsStore = new FilmsStore();
export default filmsStore;
