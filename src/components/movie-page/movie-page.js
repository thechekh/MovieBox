import React from 'react';
import './movie-page.css'

import ApiService from "../../services/movie-api";

class MoviePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            film: null,
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

    render() {
        const {film} = this.state;
        console.log(film)
        return (
            <div>
                <div className="container">
                    <div className="row movie__overview">
                        {film &&
                        <>
                            <div className="col-3">

                                <img src={`http://image.tmdb.org/t/p/w342${film.poster_path}`} width={250} height={250}
                                     alt=""/>
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


export default MoviePage
