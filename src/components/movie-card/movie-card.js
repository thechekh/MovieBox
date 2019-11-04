import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import './movie-card.css';
import MovieCardImage from "./movie-card-image";


const MovieCard = (props) => {
    const {poster, id, title, rate, type} = props;

    const year = props.year.split('-')[0];
    const genres = props.genres.filter((item) => {
        if (type.includes(item.id)) {
            return item
        }
        return false;
    });
    const genresNames = genres.slice(0, 3).map(item => item.name);
    const genresString = genresNames.join(', ');
    return (
        <div className=' col-6 col-lg-3 d-flex flex-column justify-content-end align-items-center'>
            <MovieCardImage path={poster} year={year} id={id}/>
            <div className="movie__desc d-flex align-items-center justify-content-around">
                <div className="movie__about">
                    <h2 className="movie__name">{title}</h2>
                    <span className="movie__type">
                            {
                                genresString
                            }
                        </span>
                </div>
                <div className="movie__rate">{rate}</div>
            </div>
        </div>
    )
};
MovieCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string,
    rate: PropTypes.number,
};
let mapStateToProps = state => {
    return {
        genres: state.genres,
    }
};
export default connect(mapStateToProps)(MovieCard);
