import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import "./movie-card.css";
import MovieCardImage from "./movie-card-image";

const MovieCard = ({ poster, id, title, rate, type, year, genres }) => {
  const movieYear = moment(year, "YYYY/MM/DD").year();
  const movieGenres = genres.filter(item => type.includes(item.id));
  const genresNames = movieGenres.map(item => item.name);
  const genresString = genresNames.join(", ");

  return (
    <div className=" col-6 col-lg-3 d-flex flex-column justify-content-end align-items-center">
      <MovieCardImage path={poster} year={movieYear} id={id} />
      <div className="movie__desc d-flex align-items-center justify-content-around">
        <div className="movie__about">
          <h2 className="movie__name">{title}</h2>
          <span className="movie__type">{genresString}</span>
        </div>
        <div className="movie__rate">{rate}</div>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  type: PropTypes.array.isRequired,

  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => {
  return {
    genres: state.genres
  };
};
export default connect(mapStateToProps)(MovieCard);
