import { Link } from "react-router-dom";
import React from "react";
import defaultImg from "./default_img.png";

interface IProps {
  id: number;
  path: string;
  year: number;
}

function MovieCardImage(props: IProps) {
  const { id, path, year } = props;
  return (
    <div className="movie__img">
      <Link to={`/movie/${id}`}>
        {path ? (
          <img
            src={`http://image.tmdb.org/t/p/w500${path}`}
            alt="movie_image"
          />
        ) : (
          <img src={defaultImg} width={500} alt="image_not_found" />
        )}
      </Link>
      <span className="movie__year">{year}</span>
    </div>
  );
}

export default MovieCardImage;
