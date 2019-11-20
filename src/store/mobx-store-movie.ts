import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";
import TGenres from "./mobx-store-genres";

export type TMovie = {
  voteAverage: string;
  backdropPath: string;
  posterPath: string;
  overview: string;
  title: string;
  id: number;
  releaseDate: string;
  genresIds: Array<number> | null;
  genres: Array<TGenres>;
};

class MovieStore {
  @observable
  movie: TMovie | null = null;

  @observable
  favorites: Array<TMovie> = [];

  @observable
  loading: boolean = true;

  @action
  fetchMovie = async (id: number) => {
    try {
      const movie = await instance.get(`movie/${id}`);

      // @ts-ignore
      this.movie = camelcaseKeys(movie.data);
    } finally {
      this.loading = false;
    }
  };

  isFavorite = (id: number) =>
    this.favorites.some((item: any) => item.id === id);

  @action
  addFavorite = (movie: any) => {
    this.favorites.unshift(movie);
  };

  @action
  removeFavorite = (id: number) => {
    this.favorites = this.favorites.filter((item: any) => item.id !== id);
  };
}

export default MovieStore;
