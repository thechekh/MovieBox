import { observable, action } from "mobx";

import instance from "../utils/axios-config";

export type TGenres = {
  id: number;
  name: string;
};

export interface IGenresStore {
  genres: TGenres | null;
  loading: boolean;
  fetchGenres: () => void;
}

class GenresStore implements IGenresStore {
  @observable
  genres = null;

  @observable
  loading = true;

  @action
  fetchGenres = async () => {
    try {
      const payload = await instance.get(`genre/movie/list`);
      this.genres = payload.data.genres;
    } catch (err) {
      const msg = "Failed Load data, error";
      console.log(msg, err);
    } finally {
      this.loading = false;
    }
  };
}
const genresStore = new GenresStore();
export default genresStore;
