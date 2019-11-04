import React from "react";

import "./movie-page.css";
import MovieDetails from "../../movie-details";
import AppHeader from "../../app-header";

const MoviePage = props => {
  const { id } = props.match.params;
  return (
    <>
      <AppHeader />
      <MovieDetails id={Number(id)} />
    </>
  );
};

export default MoviePage;
