import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { inject, observer } from "mobx-react";

import "./movie-details.css";
import defaultImg from "../movie-card/default_img.png";
import Spinner from "../spinner";
import { TGenres } from "../../store/mobx-store-genres";
import { IMovieStore } from "../../store/mobx-store-movie";
import { toast } from "react-toastify";
import AppHeader from "../app-header";

interface IProps {
  id: number;
  movieStore?: IMovieStore;
}

@inject("movieStore")
@observer
class MovieDetails extends React.Component<IProps> {
  componentDidMount() {
    const { id, movieStore } = this.props;
    movieStore!.loading = true;
    movieStore!.fetchMovie(id);
  }

  /*   componentDidUpdate() {
           const {movieStore} = this.props;
           movieStore!.toggleErrorFalse();
       }*/

  addFavoriteHandler = () => {
    const { movieStore } = this.props;
    const { addFavorite, movie } = movieStore!;
    addFavorite(movie!);
  };

  removeFavoriteHandler = () => {
    const { id, movieStore } = this.props;
    const { removeFavorite } = movieStore!;
    removeFavorite(id);
  };

  getCategoryFilmString = (genres: Array<TGenres>): string => {
    const genresNames: Array<string> = genres.map(
      (item: TGenres) => item.name.charAt(0).toUpperCase() + item.name.slice(1)
    );
    return genresNames.join(", ");
  };

  render() {
    const { id, movieStore } = this.props;
    const { movie, error, loading } = movieStore!;
    const isFavorite = movieStore!.isFavorite(id);
    const bgPoster = {
      backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255,0.1), rgba(0, 0, 0,0.9) 95% )
            ,url(http://image.tmdb.org/t/p/w500${movie && movie.backdropPath}`
    };

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      toast.error("Cannot load Movie", { position: "bottom-right" });
      movieStore!.toggleErrorFalse();
      return (
        <>
          <h1 className="error_text">Error while load movie</h1>
        </>
      );
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
