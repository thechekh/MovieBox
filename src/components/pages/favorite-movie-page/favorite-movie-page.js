import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';


import './favorite-movie-page.css';
import MovieGrid from "../../movie-grid";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

class FavoriteMoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: null,
        };
    }

    componentDidMount() {
        this.setState({
            films: this.getFavorites(this.props.match.params.page || 1),
        });
    }

    changeFavoritePage = e => {
        let {selected} = e;
        selected++;
        if (selected) {
            this.props.history.push(`/favorites/${selected}`);
            this.updateFavorites(selected)
        }
    };

    updateFavorites(pageNumber) {
        this.setState({
            films: this.getFavorites(pageNumber)
        })
    }

    getFavorites(pageNumber) {
        const {favorites} = this.props;
        const page_size = 20;
        const filmsStartCount = pageNumber * page_size - page_size;
        const newFavoriteFilms = [];
        for (let i = filmsStartCount; i < filmsStartCount + page_size; i++) {
            if (favorites[i]) {
                newFavoriteFilms.push(favorites[i])
            }
        }
        return newFavoriteFilms
    }

    render() {
        const {page} = this.props.match.params;
        const {films} = this.state;
        const {favorites} = this.props;
        return (
            <>
                <AppHeader/>
                <div className="d-flex justify-content-center align-items-center">
                    <h2 className="favorite__page__header">favorite page</h2>
                </div>
                {films && films.length !== 0 ?
                    (<>
                            <MovieGrid films={films}/>

                            {favorites.length > 20 &&
                            <Pagination initialPage={page || 1}
                                        pageCount={Math.ceil(this.props.favorites.length / 20)}
                                        changePage={this.changeFavoritePage}
                            />
                            }
                        </>
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
        favorites: state.favorites,
    }
}
export default connect(mapStateToProps)(FavoriteMoviePage);


