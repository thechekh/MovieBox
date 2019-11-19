import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import "./movie-grid.css";
import MovieCard from "../movie-card";

interface IProps {
  films: any;
}

@observer
class MovieGrid extends React.Component<IProps> {
  displayFilms = (movie: any) => {
    const {
      title,
      voteAverage,
      posterPath,
      id,
      releaseDate,
      genreIds = 0,
      genres = []
    }: {
      title: string;
      voteAverage: string;
      posterPath: string;
      id: number;
      releaseDate: string;
      genreIds?: number;
      genres?: Array<object>;
    } = movie;

    return (
      <MovieCard
        title={title}
        rate={voteAverage}
        poster={posterPath}
        id={id}
        type={genreIds || genres.map((genre: any) => genre.id)}
        year={releaseDate}
        key={id}
      />
    );
  };

  render() {
    const { films } = this.props;
    return (
      <div className="movie__grid">
        <div className="container">
          <div className="row justify-content-start movie__block">
            {films && films.map(this.displayFilms)}
          </div>
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(MovieGrid);
