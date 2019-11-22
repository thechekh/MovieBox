import { create } from "mobx-persist";
import filmsStore from "./mobx-store-films";
import genresStore from "./mobx-store-genres";
import movieStore from "./mobx-store-movie";

const hydrate = create({
  storage: localStorage,
  jsonify: false
});

const result = hydrate("some", movieStore);
result.then(() => console.log("some hydrated"));

const rehydrate = result.rehydrate;
setTimeout(() => {
  rehydrate().then(() => console.log("rehydrated", movieStore));
}, 3000);

const rootStore = {
  filmsStore,
  genresStore,
  movieStore
};

export default rootStore;
