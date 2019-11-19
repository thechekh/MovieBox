import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

class MovieStore {
  @observable
  movie = null;

  @observable
  favorites = [];

  @observable
  loading = true;

  @action
  fetchMovie = async id => {
    try {
      const movie = await instance.get(`movie/${id}`);
      this.movie = camelcaseKeys(movie.data);
    } finally {
      this.loading = false;
    }
  };

  isFavorite = id => this.favorites.some(item => item.id === id);

  @action
  addFavorite = movie => {
    this.favorites.unshift(movie);
  };

  @action
  removeFavorite = id => {
    this.favorites = this.favorites.filter(item => item.id !== id);
  };
}

export default MovieStore;
