import React from 'react';
import MovieGrid from "../movie-grid";
import './favorite-movie-page.css';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

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
                    <h2>Favorite movie not found</h2>
                )
            }
        </>
    )
}
FavoriteMoviePage.defaultProps = {
    page: 1,
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


