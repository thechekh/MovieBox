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
      console.log("res GetFilms",this.GetFilms())
    }
    GetFilms(){
        const favFilms = this.props.favorites

        console.log("favorites from component", favFilms)
        const favFilmsId = favFilms.map((film) => film.id)
        const api = new ApiService()
       return favFilmsId.map((item) =>
            api.getFilm(item)
            )
    }

    render() {
        return (
            <>
                <h2>Fav page</h2>
                <MovieGrid/>
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


