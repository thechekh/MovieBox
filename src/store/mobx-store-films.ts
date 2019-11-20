import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

export type TResults = {
  backdropPath: string;
  posterPath: string;
  overview: string;
  title: string;
  id: number;
  releaseDate: string;
  genresIds: Array<number>;
};
export type TFilms = {
  dates: string;
  page: number;
  results: TResults;
  totalPages: number;
  totalResults: number;
};
export type IFilms = {
  films: Array<TFilms>;
};

class FilmsStore {
  @observable
  films: TFilms | null = null;

  @observable
  results: TResults | null = null;

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
      this.results = films.data.results;
    } finally {
      this.loading = false;
    }
  };
}

export default FilmsStore;
