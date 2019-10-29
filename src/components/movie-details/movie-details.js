import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import PropTypes from "prop-types";

import './movie-details.css'
import {addFavorites, removeFavorites} from "./movie-details-actions";
import {getFilm} from "./movie-details-actions";
import default_img from "../movie-card/default_img.png";
import Spinner from "../spinner/spinner";

class MovieDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: null,
            favorite: false,
            loading: true
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
        this.checkFavorite();
    }

    checkFavorite = () => {
        const isFavorite = this.props.favorites.filter(item => item.id === Number(this.props.id))
        if (isFavorite.length !== 0) {
            this.setState({
                favorite: true
            })
        }
    };
    addFavoriteHandler = () => {
        this.setState(
            this.setState({
                favorite: true
            })
        );
        this.props.addFavorites(this.state.film);
    };
    removeFavoriteHandler = () => {
        this.setState({
            favorite: false
        });
        this.props.removeFavorites(this.state.film.id);

    };

    getCategoryFilmString = (genres) => {
        const genresNames = genres.map((item) => `${item.name}`);
        return genresNames.join(', ');
    };

    render() {
        const {film} = this.state;
        let back__poster = '';
        film ? back__poster = film.backdrop_path : back__poster = null;
        const bg_poster = {
            background: ` linear-gradient(to bottom, rgba(255, 255, 255,0.1), rgba(0, 0, 0,0.9) 95% )
            ,url(http://image.tmdb.org/t/p/w500${back__poster}`,
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
                                                     className="favorite remove__favorite">removes from
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
let mapStateToProps = state => {
    return {
        favorites: state.favorites,
    }
};

export default connect(mapStateToProps, {addFavorites, removeFavorites})(MovieDetails);

