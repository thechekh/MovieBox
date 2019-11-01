import {Link} from "react-router-dom";
import React from 'react';
import default_img from "./default_img.png";

const MovieCardImage = (props) => {
    return (
        <div className="movie__img">
            <Link to={`/movie/${props.id}`}>
                {
                    props.path ?
                        (
                            <img src={`http://image.tmdb.org/t/p/w500${props.path}`}
                                 alt={'movie_image'}/>
                        )
                        :
                        (
                            <img src={default_img} width={500} alt='image_not_found'/>
                        )
                }
            </Link>
            <span className='movie__year'>{props.year}</span>
        </div>
    )
};

export default MovieCardImage;

