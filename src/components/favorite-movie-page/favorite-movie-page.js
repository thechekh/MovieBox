import React from 'react';
import MovieGrid from "../movie-grid";
import './favorite-movie-page.css';
import {connect} from 'react-redux'

const FavoriteMoviePage = (props) => {

    const page = props.page || 1;
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <h2 className="favorite__page__header">favorite page</h2>
            </div>
            {props.favorites.length !== 0 ?
                (
                    <MovieGrid favoriteFilms={props.favorites} page={page}/>
                )
                :
                (
                    <h2>Favorite movie not found</h2>
                )
            }
        </div>
    )
}

let mapStateToProps = state => {
    return {
        favorites: state.favorites
    }
}

export default connect(mapStateToProps)(FavoriteMoviePage);


