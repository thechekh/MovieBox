import filmsStore from "./mobx-store-films";
import genresStore from "./mobx-store-genres";
import movieStore from "./mobx-store-movie";

const rootStore = {
  filmsStore,
  genresStore,
  movieStore
};

export default rootStore;
