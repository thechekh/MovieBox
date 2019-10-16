import React from 'react';
import './movie-page.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

import ApiService from "../../services/movie-api";

class MoviePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            film: null,
            favorite: false,
        };

        this.updateFilm()
    }

    updateFilm() {
        this.state.api.getFilm(this.props.id)
            .then((film) => {
                this.setState({
                    film: film
                });
            }).then(() => console.log('state updated', this.state))

    }

    log=()=> {
        console.log('added to favorites', this.state.film.id)
/*        favvo
        favorites.push(this.state.film.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));*/
    }
    handleClickk=()=> {
        this.props.changeFunc(this.state.film.id);
    }


    render() {
        const {film} = this.state;
        console.log(film)
        return (
            <div>
                <div className="container">
                    <div className="row movie__overview">
                        {film &&
                        <>
                            {/*    <img src={`http://image.tmdb.org/t/p/w342${film.backdrop_path}`} alt=""/>*/}
                            <div className="col-3">

                                <img src={`http://image.tmdb.org/t/p/w342${film.poster_path}`} width={250} height={250}
                                     alt="movie_image"/>

                                {
                                    this.state.favorite ?
                                        (<button
                                                className="favorite remove__favorite">removes from
                                                favorites <FontAwesomeIcon
                                                    icon={faStar}/>
                                            </button>

                                        ) :
                                        (<button
                                                onClick={this.handleClickk}
                                                className=" favorite add__favorite">Add to favorites <FontAwesomeIcon
                                                icon={faStar}/>
                                            </button>
                                        )
                                }
                            </div>
                            < div className="col-9">
                                <h1>Overview</h1>
                                <span>{film.overview}</span>
                            </div>
                        </>
                        }


                    </div>
                </div>


                < /div>
                    );
                    }
                    }


                    export default MoviePage
