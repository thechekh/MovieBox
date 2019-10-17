import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
/*import Pagination from "../pagination"*/
import {Link} from "react-router-dom";

class MovieGrid extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            films: null,
        };
        this.updateFilms()
    }

    updateFilms() {
        this.state.api.getFilms()
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results
                });
            })

    }

    render() {
        const {films} = this.state;
        const {favoriteFilms} = this.props
        console.log("favfilms", favoriteFilms);
        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-flex-start">


                        {favoriteFilms ?
                            (favoriteFilms.map((movie) => {
                                    const {title, vote_average, poster_path, id} = movie;
                                    return <MovieCart title={title} rate={vote_average} poster={poster_path} id={id}
                                                      key={id}/>
                                }
                            ))
                            :
                            (films &&
                                films.map((movie) => {
                                    const {title, vote_average, poster_path, id} = movie;
                                    return <MovieCart title={title} rate={vote_average} poster={poster_path} id={id}
                                                      key={id}/>
                                }))
                        }

                        < /div>

                            {/*<Pagination/>*/}


                    </div>
                </div>
                )
                }

                };

                export default MovieGrid;