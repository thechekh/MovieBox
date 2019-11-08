import { createSelector } from "reselect";

const selectGenres = state => state.genres;
const makeSelectGenres = () =>
  createSelector(
    selectGenres,
    genres => genres
  );
export { selectGenres, makeSelectGenres };
