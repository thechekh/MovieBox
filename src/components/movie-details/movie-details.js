import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import PropTypes from "prop-types";

import {makeMapStateToProps} from "../../selectors/movie-details-selectors"
import './movie-details.css'
import {getFilm, addFavorite, removeFavorite} from "./movie-details-actions";
import default_img from "../movie-card/default_img.png";
import Spinner from "../spinner";

class MovieDetails extends React.Component {

    componentDidMount() {
        this.props.getFilm(this.props.id)
    }

    addFavoriteHandler = () => {
        this.props.addFavorite(this.props.movie);
    };
    removeFavoriteHandler = () => {
        this.props.removeFavorite(this.props.movie.id);
    };

    getCategoryFilmString = (genres) => {
        const genresNames = genres.map(item => item.name);
        return genresNames.join(', ');
    };

    render() {
        const {movie, loading} = this.props;
        const bg_poster = {
            backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255,0.1), rgba(0, 0, 0,0.9) 95% )
            ,url(http://image.tmdb.org/t/p/w500${movie && movie.backdrop_path}`,
        };

        if (loading) {
            return <Spinner/>
        }

        return (
            <div>

                {movie &&
                <>
                    <div className="container-fluid back__poster
                         d-flex justify-content-end flex-column" style={bg_poster}>

                        <h1>{movie.title}</h1>
                        <div className="about">
                            <span>{movie.release_date.split('-')[0]} </span>
                            <span>

                                    {
                                        this.getCategoryFilmString(movie.genres)

                                    }
                                        </span>

                        </div>
                    </div>
                    <div className="container">
                        <div className="row movie__overview">

                            <div className="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center flex-column">
                                {movie.poster_path ? (
                                    <img src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                         alt={movie.title}/>
                                ) : (<img src={default_img} alt={'default img'}/>)
                                }
                                {
                                    this.props.isFavorite ?
                                        (<button onClick={this.removeFavoriteHandler}
                                                 className="favorite remove__favorite">Removes from
                                                favorites <FontAwesomeIcon
                                                    icon={faStar}/>
                                            </button>

                                        ) :
                                        (<button
                                                onClick={this.addFavoriteHandler}
                                                className=" favorite add__favorite">Add to
                                                favorites <FontAwesomeIcon
                                                    icon={faStar}/>
                                            </button>
                                        )
                                }
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-9 ">
                                <h2>Overview</h2>
                                <span>{movie.overview}</span>
                            </div>

                        </div>
                    </div>
                </>
                }
            </div>
        );
    }
}

MovieDetails.propTypes = {
    id: PropTypes.number,
    favorites: PropTypes.array,
};


export default connect(makeMapStateToProps, {addFavorite, removeFavorite, getFilm})(MovieDetails);

