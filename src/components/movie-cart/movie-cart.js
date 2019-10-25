import React from 'react';
import './movie-cart.css';
import {Link} from "react-router-dom";
import default_img from "./default_img.png"
import {connect} from "react-redux";
import PropTypes from "prop-types";

const MovieCart = (props) => {
    const {poster, id, title, rate} = props;
    const year = props.year.match(/..../);
    const type_id = props.type;
    const type_name_array = [];
   props.genres.map((item) => {
        if (type_id.includes(item.id)) {
            type_name_array.push(item.name)
        }
    });
    type_name_array.length = 3;
    return (
        <div className=' col-6 col-lg-3 d-flex flex-column justify-content-end align-items-center'>
            <div className="movie__img">
                <Link to={`/movie/${id}`}>
                    {
                        poster ?
                            (
                                <img src={`http://image.tmdb.org/t/p/w500${poster}`}
                                     alt={title}/>
                            )
                            :
                            (
                                <img src={default_img} width={500} alt='image_not_found'/>
                            )
                    }
                </Link>
                <span className='movie__year'>{year}</span>
            </div>
            <div className="movie__desc d-flex align-items-center justify-content-around">
                <div className="movie__about">
                    <h2 className="movie__name">{title}</h2>
                    <span className="movie__type">
                            {
                                type_name_array.map((item) => `${item} `)
                            }
                        </span>
                </div>
                <div className="movie__rate">{rate}</div>
            </div>
        </div>
    )
};
MovieCart.propTypes = {
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
export default connect(mapStateToProps)(MovieCart);
