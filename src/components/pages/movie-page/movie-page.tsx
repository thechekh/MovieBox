import React from "react";
import { RouteComponentProps } from "react-router-dom";

import "./movie-page.css";
import MovieDetails from "../../movie-details";
import AppHeader from "../../app-header";

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

function MoviePage(props: MatchProps) {
  const {
    match: {
      params: { id }
    }
  } = props;
  return (
    <>
      <AppHeader />
      <MovieDetails id={Number(id)} />
    </>
  );
}

export default MoviePage;
