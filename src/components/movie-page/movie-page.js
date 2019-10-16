import React from 'react';
import './movie-page.css'
import AppHeader from "../app-header";
import MovieGrid from "../movie-grid";
import movieImage from '../movie-cart/mov1.png';
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
        return (
            <div>
                <div className="container">
                    <div className="row">

                        <div className="col-3">

                            <img src={movieImage} width={250} height={250} alt=""/>

                        </div>
                        <div className="col-9">
                            <h1>Overview</h1>
                            <div className="movie__about">

                            </div>


                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


export default MoviePage
