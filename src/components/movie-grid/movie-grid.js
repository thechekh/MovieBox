import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import './movie-grid.css'
import MovieCard from '../movie-card';

class MovieGrid extends React.Component {

    displayFilms(movie) {
        const {title, vote_average, poster_path, id, genres = [], release_date, genre_ids = 0} = movie;
        return <MovieCard
            title={title}
            rate={vote_average}
            poster={poster_path}
            id={id}
            type={genre_ids ||
            genres.map((genre) => genre.id)
            }
            year={release_date}
            key={id}/>
    }
    render() {
        const {films} = this.props;
        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie__block">

                        {
                            films &&
                            films.map(this.displayFilms)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        genres: state.genres,
    }
};

export default withRouter(connect(mapStateToProps)(MovieGrid));



