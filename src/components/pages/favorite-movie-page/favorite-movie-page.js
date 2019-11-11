import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

class FavoriteMoviePage extends React.Component {
  getFavorites(pageNumber) {
    const { favorites } = this.props;
    const pageSize = 20;
    const filmsStartCount = pageNumber * pageSize - pageSize;
    const newFavoriteFilms = [];
    for (let i = filmsStartCount; i < filmsStartCount + pageSize; i + 1) {
      if (favorites[i]) {
        newFavoriteFilms.push(favorites[i]);
      }
    }
    return newFavoriteFilms;
  }

  changeFavoritePage = e => {
    const { history } = this.props;
    const { selected } = e;
    const page = selected + 1;
    history.push(`/favorites/${page}`);
  };

  render() {
    const { favorites, match } = this.props;
    const { page } = match.params;
    const films = this.getFavorites(page || 1);
    return (
      <>
        <AppHeader />
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="favorite__page__header">favorite page</h2>
        </div>
        {films && films.length !== 0 ? (
          <>
            <MovieGrid films={films} />

            {favorites.length > 20 && (
              <Pagination
                initialPage={page}
                pageCount={Math.ceil(favorites.length / 20)}
                changePage={this.changeFavoritePage}
              />
            )}
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
FavoriteMoviePage.defaultProps = {
  favorites: []
};
FavoriteMoviePage.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      backdropPath: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      posterPath: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired
    })
  ),

  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired
};
const mapStateToProps = state => {
  return {
    favorites: state.films.favorites
  };
};
export default connect(mapStateToProps)(FavoriteMoviePage);
