import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import AppHeader from "../../app-header";

interface IProps {
  history: any;
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
class FavoriteMoviePage extends React.Component<IProps> {
  changeFavoritePage = (e: object) => {
    const { history } = this.props;
    // @ts-ignore
    const { selected }: { selected: number } = e;
    const page = selected + 1;
    history.push(`/favorites/${page}`);
  };

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
