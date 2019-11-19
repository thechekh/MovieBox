import { observable, action } from "mobx";

import instance from "../utils/axios-config";

class GenresStore {
  @observable
  genres = null;

  @observable
  loading = true;

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
