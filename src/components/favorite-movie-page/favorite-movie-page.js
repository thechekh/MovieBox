import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';


import './favorite-movie-page.css';
import MovieGrid from "../movie-grid";

const FavoriteMoviePage = (props) => {
    const {page} = props;
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <h2 className="favorite__page__header">favorite page</h2>
            </div>
            {props.favorites.length !== 0 ?
                (
                    <MovieGrid favoriteFilms={props.favorites} page={page}/>
                )
                :
                (
                    <div className="d-flex justify-content-center">
                        <h2>Favorite movie not found</h2>
                    </div>
                )
            }
        </>
    )
}
FavoriteMoviePage.defaultProps = {
    favorites: [],
}
FavoriteMoviePage.propTypes = {
    page: PropTypes.number,
    favorites: PropTypes.array,
};
const mapStateToProps = state => {
    return {
        favorites: state.favorites
    }
}
export default connect(mapStateToProps)(FavoriteMoviePage);


