import FilmsStore from "./mobx-store-films";
import GenresStore from "./mobx-store-genres";
import MovieStore from "./mobx-store-movie";

class RootStore {
  filmsStore: FilmsStore;

  genresStore: GenresStore;

  movieStore: MovieStore;

  constructor() {
    this.filmsStore = new FilmsStore();
    this.genresStore = new GenresStore();
    this.movieStore = new MovieStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
