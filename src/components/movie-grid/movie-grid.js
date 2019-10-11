import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'

const MovieGrid = () => {
    return (
        <div className='movie__grid'>
            <div className='container'>
               <div className="row justify-content-around">
                   <MovieCart/>
                   <MovieCart/>
                   <MovieCart/>

               </div>
            </div>
        </div>
    )

};

export default MovieGrid;