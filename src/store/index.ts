import { create } from "mobx-persist";
import filmsStore from "./mobx-store-films";
import genresStore from "./mobx-store-genres";
import movieStore from "./mobx-store-movie";

const hydrate = create({
  storage: localStorage,
  jsonify: false
});
hydrate("fdfd", movieStore.favorites).then(() =>
  console.log("someStore has been hydrated")
);

const rootStore = {
  filmsStore,
  genresStore,
  movieStore
};

export default rootStore;
