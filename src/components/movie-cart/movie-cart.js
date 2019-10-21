import React from 'react';
import './movie-cart.css';
import {Link} from "react-router-dom";
import default_img from "./default_img.png"
import {connect} from "react-redux";

class MovieCart extends React.Component {
    render() {
        const {poster, id, title, rate} = this.props;
        const year = this.props.year.match(/..../);
        const type_id = this.props.type;
        const type_name_array = []
        this.props.genres.map((item) => {
            if (type_id.includes(item.id)) {
                type_name_array.push(item.name)
            }
        })
        type_name_array.length = 3;

        return (
            <div className=' col-6 col-lg-3 d-flex flex-column justify-content-center align-items-center'>
                <div className="movie__img d-flex flex-column align-items-center">
                    <Link to={`/movie/${id}`}>
                        {
                            this.props.poster ?
                                (
                                    <img src={`http://image.tmdb.org/t/p/w300${poster}`}
                                         alt={'movie_img'}/>
                                )
                                :
                                (
                                    <img src={default_img} width={300}  alt='default'/>
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
    }

};
let mapStateToProps = state => {

    return {
        genres: state.genres,
    }
}
export default connect(mapStateToProps)(MovieCart);
