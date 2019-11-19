import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import AppHeader from "../../app-header";

@inject("movieStore")
@observer
class FavoriteMoviePage extends React.Component {
  changeFavoritePage = e => {
    const { history } = this.props;
    const { selected } = e;
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

FavoriteMoviePage.wrappedComponent.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  movieStore: PropTypes.shape({
    movie: PropTypes.object,
    favorites: PropTypes.array.isRequired,
    isFavorite: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchMovie: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired
  }).isRequired
};

export default FavoriteMoviePage;
