import React from "react";
import moment from "moment";
import { inject, observer } from "mobx-react";

import "./movie-card.css";
import MovieCardImage from "../movie-card-image";
import TGenres from "../../store/mobx-store-genres";

interface IProps {
  id: number;
  title: string;
  year: string;
  rate: string;
  poster: string;
  type: any;
  genresStore?: {
    genres: Array<TGenres>;
    loading: boolean;
    fetchGenres: () => void;
  };
}

const MovieCard: React.FunctionComponent<IProps> = inject("genresStore")(
  observer(({ poster, id, title, rate, type, year, genresStore }) => {
    const movieYear: number = moment(year, "YYYY/MM/DD").year();
    const { genres } = genresStore!;
    console.log("TYPE", type);
    console.log("TYPE", typeof type);
    const movieGenres = genres.filter((item: any) => type.includes(item.id));
    const genresNames = movieGenres.map((item: any) => item.name);
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
  })
);

export default MovieCard;
