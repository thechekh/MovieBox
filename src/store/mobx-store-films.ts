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
  /** Review: 1) ты в интерфейсе уже изнчально неверно задал тип, так это у тебя массив, а не просто объект
   * 2) as any в идеале никогда не использовать
   * 3) данные из запроса тебе известны. Как минимум есть документация, как максимум - инспектор запросов */
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
      /** Review: Вместо консоли просто выводи пользователю ошибку. К примеру react-toast-notifications */
      // eslint-disable-next-line no-console
      console.log(msg, err);
    } finally {
      this.loading = false;
    }
  };
}

const filmsStore = new FilmsStore();
export default filmsStore;
