import React from "react";

import { observer, inject } from "mobx-react";
import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import AppHeader from "../../app-header";
import { IMovieStore, TMovie } from "../../../store/mobx-store-movie";

interface IProps {
  movieStore: IMovieStore;
}

@inject("movieStore")
@observer
class FavoriteMoviePage extends React.Component<IProps> {
  render() {
    const { movieStore } = this.props;
    const films: Array<TMovie> | null = movieStore.favorites;

    return (
      <>
        <AppHeader />
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="favorite__page__header">favorite page</h2>
        </div>
        {films && films.length !== 0 ? (
          <>
            <MovieGrid films={films} />
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <h2>Favorite movie not found</h2>
          </div>
        )}
      </>
    );
  }
}

export default FavoriteMoviePage;
