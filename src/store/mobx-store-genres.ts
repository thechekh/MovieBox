import { observable, action } from "mobx";

import instance from "../utils/axios-config";

export type TGenres = {
  id: number;
  name: string;
};

export interface IGenresStore {
  genres: Array<TGenres>;
  loading: boolean;
  error: boolean;
  fetchGenres: () => void;
}

class GenresStore implements IGenresStore {
  @observable
  genres = [];

  @observable
  loading = true;

  @observable
  error = false;

  @action
  fetchGenres = async () => {
    try {
      //throw "Error"
      const payload = await instance.get(`genre/movie/list`);
      this.genres = payload.data.genres;
    } catch (err) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  };
}

const genresStore = new GenresStore();
export default genresStore;
