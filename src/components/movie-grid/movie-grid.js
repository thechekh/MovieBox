import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
import Pagination from "../pagination"
import  {Link} from "react-router-dom";

class MovieGrid extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            films: null,
            mov: '15'
        };
        console.log('constructor state', this.state)
        this.updateFilms()
    }

    updateFilms() {
        this.state.api.getFilms()
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results
                });
            }).then(() => console.log('state updated', this.state))

    }

    render() {
        const {films} = this.state;
        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-between">

                        {films &&
                        films.map((movie) => {
                            const {title, vote_average, poster_path,id} = movie;
                            return <Link to="/movie/:id" ><MovieCart title={title} rate={vote_average} poster={poster_path} id={id}/></Link>
                                    })
                        }

                    </div>

                    <Pagination/>


                </div>
            </div>
        )
    }

};

export default MovieGrid;