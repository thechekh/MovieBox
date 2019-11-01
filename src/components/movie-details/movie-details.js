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
    constructor(props) {
        super(props);
        this.state = {
            film: null,
            loading: true,
            favorite: this.props.isFavorite,
        };
    }
    componentDidMount() {
        getFilm(this.props.id)
            .then((film) => {
                this.setState({
                    film: film,
                    loading: false,
                });
            });
    }
    addFavoriteHandler = () => {
        this.setState(
            this.setState({
                favorite: true
            })
        );
        this.props.addFavorite(this.state.film);
    };
    removeFavoriteHandler = () => {
        this.setState({
            favorite: false
        });
        this.props.removeFavorite(this.state.film.id);
    };

    getCategoryFilmString = (genres) => {
        console.log('genres', genres)
        const genresNames = genres.map(item => item.name);
        return genresNames.join(', ');
    };

    render() {
        const {film} = this.state;
        const bg_poster = {
            background: ` linear-gradient(to bottom, rgba(255, 255, 255,0.1), rgba(0, 0, 0,0.9) 95% )
            ,url(http://image.tmdb.org/t/p/w500${film && film.backdrop_path}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        };

        if (this.state.loading) {
            return <Spinner/>
        }
        return (
            <div>
                {
                    film &&
                    <>
                        <div className="container-fluid back__poster
                         d-flex justify-content-end flex-column" style={bg_poster}>

                            <h1>{film.title}</h1>
                            <div className="about">
                                <span>{film.release_date.match(/..../)} </span>
                                <span>

                                    {
                                        this.getCategoryFilmString(film.genres)

                                    }
                                        </span>

                            </div>
                        </div>
                        <div className="container">
                            <div className="row movie__overview">

                                <div className="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center flex-column">
                                    {film.poster_path ? (
                                        <img src={`http://image.tmdb.org/t/p/w300${film.poster_path}`}
                                             alt={film.title}/>
                                    ) : (<img src={default_img} alt={'image not found'}/>)
                                    }
                                    {
                                        this.state.favorite ?
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
                                    <span>{film.overview}</span>
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


export default connect(makeMapStateToProps, {addFavorite, removeFavorite})(MovieDetails);

