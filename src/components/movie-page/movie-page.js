import React from 'react';
import './movie-page.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {addFavorites, removeFavorites} from "./movie-page-actions";
import ApiService from "../../services/movie-api";
import {connect} from 'react-redux'
import favorites from "../../reducers/favorites";
import defautl_img from "../movie-cart/default_img.jpeg";
import {Link} from "react-router-dom";
import default_img from "../movie-cart/default_img.jpeg"

class MoviePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            film: null,
            favorite: false,
        };

        this.updateFilm();



    }

    componentDidMount() {
        this.checkFavorite()
    }


    updateFilm() {
        this.state.api.getFilm(this.props.id)
            .then((film) => {
                this.setState({
                    film: film
                });
            })

    }

    checkFavorite = () => {
        console.log('FILM ID for check FAVOTRTIE', this.props.id)
        console.log('FAVORITES', this.props.favorites)
        const newmass = this.props.favorites.filter(items => items.id === Number(this.props.id))

       if (newmass.length!==0) {  console.log('TRIGGERED')
           this.setState({
               favorite: true
           })
       }

    }
        addFavoriteHandler = () => {
            this.setState(
                this.setState({
                    favorite: true
                })
            )
            this.props.addFavorites(this.state.film);

        }
        removeFavoriteHandler = () => {
            this.setState(
                this.setState({
                    favorite: false
                })
            )
            this.props.removeFavorites(this.state.film.id);

        }

        render()
        {
            const {film} = this.state;
            return (
                <div>
                    <div className="container">
                        <div className="row movie__overview">
                            {film &&
                            <>
                                {/*    <img src={`http://image.tmdb.org/t/p/w342${film.backdrop_path}`} alt=""/>*/}
                                <div className="col-3">
                                    {film.poster_path ? (
                                        <img src={`http://image.tmdb.org/t/p/w342${film.poster_path}`} width={195} height={250}
                                             alt={'rtrt'}/>
                                    ) : (<img src={defautl_img} width={195} height={250} alt={'rtrt'}/>)
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
                                < div className="col-9">
                                    <h1>Overview</h1>
                                    <span>{film.overview}</span>
                                </div>
                            </>
                            }


                        </div>
                    </div>
                </div>
            );
        }
    }

    let
    mapStateToProps = state => {

        return {
            favorites: state.favorites,
        }
    }
    export default connect(mapStateToProps, {addFavorites, removeFavorites})(MoviePage);

