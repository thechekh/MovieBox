import { observable, action } from "mobx";

import instance from "../utils/axios-config";

type TGenres = {
  id: number;
  name: string;
};

class GenresStore {
  @observable
  genres: TGenres | null = null;

  @observable
  loading: boolean = true;

  @action
  fetchGenres = async () => {
    try {
      const payload = await instance.get(`genre/movie/list`);
      this.genres = payload.data.genres;
    } finally {
      this.loading = false;
    }
  };
}

export default GenresStore;
