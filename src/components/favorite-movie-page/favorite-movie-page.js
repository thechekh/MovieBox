import React from 'react';
import MovieGrid from "../movie-grid";
import './favorite-movie-page.css';
import {connect} from 'react-redux'

class FavoriteMoviePage extends React.Component {

    render() {
        return (
                <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <h2 class="favorite__page__header">favorite page</h2>
                </div>
                {this.props.favorites.length !== 0 ? (
                    <MovieGrid favoriteFilms={this.props.favorites}/>) :
                    (<h2>Favorite movie not found</h2>)
                }
                </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        favorites: state.favorites
    }
}

export default connect(mapStateToProps)(FavoriteMoviePage);


