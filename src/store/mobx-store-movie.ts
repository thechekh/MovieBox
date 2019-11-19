import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

class MovieStore {
  @observable
  movie: object | undefined;

  @observable
  favorites: Array<object> = [];

  @observable
  loading: boolean = true;

  @action
  fetchMovie = async (id: number) => {
    try {
      const movie = await instance.get(`movie/${id}`);

      this.movie = camelcaseKeys(movie.data);
    } finally {
      this.loading = false;
    }
  };

  isFavorite = (id: number) =>
    this.favorites.some((item: any) => item.id === id);

  @action
  addFavorite = (movie: any) => {
    // @ts-ignore
    this.favorites.unshift(movie);
  };

  @action
  removeFavorite = (id: number) => {
    this.favorites = this.favorites.filter((item: any) => item.id !== id);
  };
}

export default MovieStore;
