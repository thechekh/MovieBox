import React from 'react';
import './movie-cart.css';
import {Link} from "react-router-dom";
import defautl_img from "./default_img.jpeg"
import {connect} from "react-redux";

class MovieCart extends React.Component {
    render() {
        const type_id = this.props.genre;
        console.log("type_id", type_id);
        const type_name_array = []
        this.props.genres.map((item) => {
            console.log("item genres", item.id)
            if (type_id.includes(item.id)) {
                type_name_array.push(item.name)
            }
        })
        return (
            <div className=' col-6 col-lg-3 d-flex flex-column justify-content-center align-items-center'>
                <div className="movie__img d-flex flex-column align-items-center">
                    <Link to={`/movie/${this.props.id}`}>
                        {this.props.poster ? (
                            <img src={`http://image.tmdb.org/t/p/w342${this.props.poster}`} width={195} height={250}
                                 alt={'movie_img'}/>
                        ) : (<img src={defautl_img} width={195} height={250} alt={'rtrt'}/>)
                        }
                    </Link>
                    <span className='movie__year'>2017</span>
                </div>
                <div className="movie__desc d-flex align-items-center justify-content-between">
                    <div className="movie__about">
                        <h2 className="movie__name">{this.props.title}</h2>
                        <span className="movie__type">{
                           type_name_array}</span>
                    </div>
                    <div className="movie__rate">{this.props.rate}</div>

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
