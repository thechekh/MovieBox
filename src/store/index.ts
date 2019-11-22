import { create } from "mobx-persist";
import filmsStore from "./mobx-store-films";
import genresStore from "./mobx-store-genres";
import movieStore from "./mobx-store-movie";
import { toJS } from "mobx";

const hydrate = create({
  storage: localStorage,
  jsonify: false
});
const result = hydrate("some", movieStore);

const rootStore = {
  filmsStore,
  genresStore,
  movieStore
};

export default rootStore;
