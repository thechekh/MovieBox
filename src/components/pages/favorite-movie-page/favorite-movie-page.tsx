import React from "react";

import { observer, inject } from "mobx-react";
import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import AppHeader from "../../app-header";
import { TMovie } from "../../../store/mobx-store-movie";

interface IProps {
  movieStore: {
    movie: TMovie;
    favorites: Array<TMovie>;
    isFavorite: (id: number) => boolean;
    loading: boolean;
    fetchMovie: (id: number) => void;
    addFavorite: (movie: object) => void;
    removeFavorite: (id: number) => void;
  };
}

@inject("movieStore")
@observer
class FavoriteMoviePage extends React.Component<IProps> {
  render() {
    const { movieStore } = this.props;
    const films = movieStore.favorites;
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
