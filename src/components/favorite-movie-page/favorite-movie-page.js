import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import MovieGrid from "../movie-grid";
import {connect} from 'react-redux'
import ApiService from '../../services/movie-api'

class FavoriteMoviePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,

        };
    }

    componentDidMount() {
        const favFilms = this.props.favorites;
        console.log("FILMSS", favFilms)
    }


    render() {

        return (
            <>
                <div className="d-flex justify-content-center align-items-center">
                    <h2>favorite page</h2>
                </div>
                {this.props.favorites.length!=0 ? (
                    <MovieGrid favoriteFilms={this.props.favorites}/>) :
                    (<h2>nothing found favorite</h2>)
                }
            </>
        )
    }
}

let mapStateToProps = state => {

    return {
        favorites: state.favorites
    }


}

export default connect(mapStateToProps)(FavoriteMoviePage);


