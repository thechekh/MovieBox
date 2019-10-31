import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import './movie-card.css';
import default_img from "./default_img.png"

{/** REVIEW: не делай 2 компонента в одном файле */}
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

const MovieCard = (props) => {
    const {poster, id, title, rate, type} = props;
    {/** REVIEW: что за это проверка регуляркой???? */}
    const year = props.year.match(/..../);
    const type_name_array = [];
    {/** REVIEW: неправильно используешь map */}
    props.genres.map((item) => {
        if (type.includes(item.id)) {
            type_name_array.push(item.name)
        }
    });
    {/** REVIEW: никогда так больше не делай, не присваивай длину массива да и еще непонятно почему именно 3 */}
    type_name_array.length = 3;
    {/** REVIEW: что и зачем ты тут фильтруешь? */}
    let genres = type_name_array.filter(item => {
        if (item)
            return item;
    });
    genres = genres.join(", ");

    return (
        <div className=' col-6 col-lg-3 d-flex flex-column justify-content-end align-items-center'>
            <MovieCardImage path={poster} year={year} id={id}/>
            <div className="movie__desc d-flex align-items-center justify-content-around">
                <div className="movie__about">
                    <h2 className="movie__name">{title}</h2>
                    <span className="movie__type">
                            {
                                genres
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
