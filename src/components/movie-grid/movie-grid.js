import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";

import Pagination from "../pagination";
import './movie-grid.css'
import MovieCard from '../movie-card';
import Spinner from "../spinner";

class MovieGrid extends React.Component {

    displayFilms(films) {
        return films.map((movie) => {
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
        })
    }

    render() {
        console.log('mgfilms', this.props);
        const {films} = this.props;
        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie__block">
                        {
                            films &&
                            this.displayFilms(films)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

/*MovieGrid.defaultProps = {
    page: 1,
}*/
MovieGrid.propTypes = {
    page: PropTypes.number,
};
const mapStateToProps = state => {
    return {
        genres: state.genres,
        totalFavoriteFilms: state.favorites.length,
    }
};

export default withRouter(connect(mapStateToProps)(MovieGrid));



