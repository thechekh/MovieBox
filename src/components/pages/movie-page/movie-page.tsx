import React from "react";

import "./movie-page.css";
import { inject, observer } from "mobx-react";
import MovieDetails from "../../movie-details";
import AppHeader from "../../app-header";

export interface Imatch {
  match: {
    isExact: boolean;
    path: string;
    url: string;
    params: any;
  };
  movieStore: {
    movie: any;
    favorites: Array<object>;
    isFavorite: (id: number) => boolean;
    loading: boolean;
    fetchMovie: (id: number) => void;
    addFavorite: (movie: object) => void;
    removeFavorite: (id: number) => void;
  };
}

@inject("movieStore")
@observer
class MoviePage extends React.Component<Imatch> {
  render() {
    const { id } = this.props.match.params;
    return (
      <>
        <AppHeader />
        <MovieDetails id={Number(id)} movieStore={this.props.movieStore} />
      </>
    );
  }
}

export default MoviePage;
