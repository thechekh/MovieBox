
import React from 'react';
import movieImage from './mov1.png';
import './movie-cart.css';
const MovieCart = () => {
    return (
        <div className='col-md-3' >
            <div className="movie__img">
                <span className='movie__year'>2017</span>
            </div>
            <div className="movie__desc">
<h2 className="movie__name">Logan</h2>
                <span className="movie__about">Action, Adventure, Fantasy</span>
                <span className="movie__rate">4.0</span>
            </div>
        </div>
    )

};

export default MovieCart;