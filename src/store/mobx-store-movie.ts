import { observable, action } from "mobx";
import camelcaseKeys from "camelcase-keys";
import { create, persist } from "mobx-persist";
import instance from "../utils/axios-config";
import { TGenres } from "./mobx-store-genres";

export type TMovie = {
  voteAverage: string;
  backdropPath: string;
  posterPath: string;
  overview: string;
  title: string;
  id: number;
  releaseDate: string;
  genreIds: Array<number> | null;
  genres: Array<TGenres>;
};

export interface IMovieStore {
  movie: TMovie;
  favorites: Array<TMovie> | null;
  loading: boolean;
  isFavorite: (id: number) => boolean;
  fetchMovie: (id: number) => void;
  addFavorite: (movie: TMovie) => void;
  removeFavorite: (id: number) => void;
}

class MovieStore implements IMovieStore {
  @observable
  movie = {} as any;

  @persist("list")
  @observable
  favorites = [] as Array<TMovie>;

  @observable
  loading = true;

  @action
  fetchMovie = async (id: number) => {
    try {
      const payload = await instance.get(`movie/${id}`);
      this.movie = camelcaseKeys(payload.data);
    } catch (err) {
      const msg = "Failed Load data, error";
      // eslint-disable-next-line no-console
      console.log(msg, err);
    } finally {
      this.loading = false;
    }
  };

  isFavorite = (id: number) =>
    this.favorites.some((movie: TMovie) => movie.id === id);

  @action
  addFavorite = (movie: TMovie) => {
    this.favorites.unshift(movie);
  };

  @action
  removeFavorite = (id: number) => {
    this.favorites = this.favorites.filter((item: any) => item.id !== id);
  };
}

const movieStore = new MovieStore();
const hydrate = create();
hydrate("movieStore", movieStore);

export default movieStore;
