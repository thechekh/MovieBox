import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    for (let i = filmsStartCount; i < filmsStartCount + pageSize; i++) {
      if (favorites[i]) {
        newFavoriteFilms.push(favorites[i]);
      }
    }
    return newFavoriteFilms;
  }

  changeFavoritePage = e => {
    let { selected } = e;
    /** Review: не используй ++. Лучше сделать const page = selected + 1; **/
    selected++;
    if (selected) {
      /** Review: деструктуризируй + опиши **/
      this.props.history.push(`/favorites/${selected}`);
    }
  };

  render() {
    /** Review: деструктуризация + опись **/
    const { page } = this.props.match.params;
    const films = this.getFavorites(page || 1);
    const { favorites } = this.props;
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
                initialPage={page || 1}
                pageCount={Math.ceil(this.props.favorites.length / 20)}
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
  /** Review: либо добавь isRequired, либо defaultProps **/
  page: PropTypes.number,
  /** Review: опиши правильно **/
  favorites: PropTypes.array
};
const mapStateToProps = state => {
  return {
    favorites: state.films.favorites
  };
};
export default connect(mapStateToProps)(FavoriteMoviePage);
