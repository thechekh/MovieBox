import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { inject, observer } from "mobx-react";

import "./movie-details.css";
import defaultImg from "../movie-card/default_img.png";
import Spinner from "../spinner";

interface IProps {
  id: number;
  movieStore?: {
    movie: {
      backdropPath: string;
      posterPath: string;
      overview: string;
      title: string;
      id: number;
      releaseDate: string;
      genres: Array<{
        id: number;
        name: string;
      }>;
    };
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
class MovieDetails extends React.Component<IProps> {
  componentDidMount() {
    const { id, movieStore } = this.props;
    movieStore!.loading = true;
    movieStore!.fetchMovie(id);
  }

  addFavoriteHandler = () => {
    const { movieStore } = this.props;
    const { addFavorite, movie } = movieStore!;
    addFavorite(movie);
  };

  removeFavoriteHandler = () => {
    const { id, movieStore } = this.props;
    const { removeFavorite } = movieStore!;
    removeFavorite(id);
  };

  getCategoryFilmString = (
    genres: Array<{
      id: number;
      name: string;
    }>
  ): string => {
    const genresNames = genres.map(
      (item: any) => item.name.charAt(0).toUpperCase() + item.name.slice(1)
    );
    return genresNames.join(", ");
  };

  render() {
    const { id, movieStore } = this.props;
    const { loading } = movieStore!;
    const isFavorite = movieStore!.isFavorite(id);
    const { movie } = movieStore!;
    const bgPoster = {
      backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255,0.1), rgba(0, 0, 0,0.9) 95% )
            ,url(http://image.tmdb.org/t/p/w500${movie && movie.backdropPath}`
    };

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        {movie && (
          <>
            <div
              className="container-fluid back__poster
                         d-flex justify-content-end flex-column"
              style={bgPoster}
            >
              <h1>{movie.title}</h1>
              <div className="about">
                <span>{moment(movie.releaseDate, "YYYY/MM/DD").year()} </span>
                <span>{this.getCategoryFilmString(movie.genres)}</span>
              </div>
            </div>
            <div className="container">
              <div className="row movie__overview">
                <div className="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center flex-column">
                  {movie.posterPath ? (
                    <img
                      src={`http://image.tmdb.org/t/p/w300${movie.posterPath}`}
                      alt={movie.title}
                    />
                  ) : (
                    <img src={defaultImg} alt="default img" />
                  )}
                  {isFavorite ? (
                    <button
                      type="button"
                      onClick={this.removeFavoriteHandler}
                      className="favorite remove__favorite"
                    >
                      Removes from favorites <FontAwesomeIcon icon={faStar} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={this.addFavoriteHandler}
                      className=" favorite add__favorite"
                    >
                      Add to favorites <FontAwesomeIcon icon={faStar} />
                    </button>
                  )}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-9 ">
                  <h2>Overview</h2>
                  <span>{movie.overview}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MovieDetails;
