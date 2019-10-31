import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {createSelector} from 'reselect';

import './movie-details.css'
import {getFilm, addFavorite, removeFavorite} from "./movie-details-actions";
import default_img from "../movie-card/default_img.png";
import Spinner from "../spinner";

{/** REVIEW: нельзя такое писать в компоненте. Должна быть отдельная папка по примеру как с редюсерами */}
const isFavorite = (state, props) =>
    state.favorites.some(item => item.id === props.id);

export const getFavoritesState = () => createSelector(
    [isFavorite],
    (isFav) => isFav
);

const makeMapStateToProps = () => {
    const isFavorite = getFavoritesState();
    return (state, props) => {
        return {
            isFavorite: isFavorite(state, props)
        }
    }
};

class MovieDetails extends React.Component {
    /** REVIEW: getderivedstatefromprops **/
    constructor(props) {
        super(props);
        this.state = {
            film: null,
            loading: true,
            favorite: this.props.isFavorite,
        };
    }

    /** REVIEW: из компонента ты должен вызвать только экшен. Экшен передаст данные в редюсер. Редюсер передаст данные в */
    /** компонен. тут ты в принципе должен избавиться от setState */
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
        {/** REVIEW: как и зачем ты это сделал? */}
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
        {/** REVIEW: зачем делать тут интерполяцию строки? Если у тебя итак тут item.name строка */}
        const genresNames = genres.map((item) => `${item.name}`);
        return genresNames.join(', ');
    };

    render() {
        const {film} = this.state;
        {/** REVIEW: подумай как можно уменьшить тернарку */}
        let back__poster = '';
        film ? back__poster = film.backdrop_path : back__poster = null;
        {/** REVIEW: перенеси стили в класс. Оставь инлайново только background-image */}
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
                    /** REVIEW: зачем тут эта проверка? */
                    film &&
                    <>
                        <div className="container-fluid back__poster
                         d-flex justify-content-end flex-column" style={bg_poster}>

                            <h1>{film.title}</h1>
                            <div className="about">
                                {/** REVIEW: магическая регулярка? */}
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

