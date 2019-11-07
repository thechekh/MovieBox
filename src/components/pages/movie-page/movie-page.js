import React from "react";

import "./movie-page.css";
import ReactRouterPropTypes from "react-router-prop-types";
import MovieDetails from "../../movie-details";
import AppHeader from "../../app-header";

const MoviePage = ({
  match: {
    params: { id }
  }
}) => {
  return (
    <>
      <AppHeader />
      <MovieDetails id={Number(id)} />
    </>
  );
};
MoviePage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};
export default MoviePage;
