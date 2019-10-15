import React from 'react';
import movieImage from './mov1.png';
import './movie-cart.css';

class MovieCart extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className='col-3 d-flex flex-column align-items-center'>
                <div className="movie__img">
                    <span className='movie__year'>2017</span>
                </div>
                <div className="movie__desc d-flex align-items-center">
                    <div className="movie__about">
                        <h2 className="movie__name">Logan</h2>
                        <span className="movie__type">Action, Adventure, Fantasy</span>
                    </div>
                    <div className="movie__rate">4.0</div>

                </div>
            </div>
        )
    }

};

export default MovieCart;