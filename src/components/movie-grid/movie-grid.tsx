import React from "react";
import { observer } from "mobx-react";

import "./movie-grid.css";
import MovieCard from "../movie-card";
import { TMovie } from "../../store/mobx-store-movie";
import { TGenres } from "../../store/mobx-store-genres";

interface IProps {
  films: Array<TMovie>;
}

@observer
class MovieGrid extends React.Component<IProps> {
  displayFilms = (movie: TMovie) => {
    const {
      title,
      voteAverage,
      posterPath,
      id,
      releaseDate,
      genresIds = [],
      genres = []
    } = movie;

    return (
      <MovieCard
        title={title}
        rate={voteAverage}
        poster={posterPath}
        id={id}
        type={genresIds || genres.map((genre: any) => genre.id)}
        year={releaseDate}
        key={id}
      />
    );
  };

  render() {
    const { films } = this.props;
    console.log("films", films);
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

export default MovieGrid;
