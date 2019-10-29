import React from 'react';
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";

import './movie-grid.css'
import {getFilms} from "./movie-grid-actions";
import MovieCart from '../movie-card';

class MovieGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            total_pages: null,
            page_size: 20,

        };

    }

    componentDidMount() {
        if (this.props.favoriteFilms) {
            console.log('favorites', this.props.favoriteFilms)
            /*      this.setState({
                      favoriteFilms: this.getFavorites(this.props.page)
                  });*/
        } else {
            console.log("DISPLAY ALL FILMS")
            this.props.getFilms(this.props.page)
        }
    }

    getFavorites(pageNumber) {
        const {favoriteFilms} = this.props;
        const {page_size} = this.state;
        const filmsStartCount = pageNumber * page_size - page_size;
        const newFavoriteFilms = [];
        for (let i = filmsStartCount; i < filmsStartCount + 20; i++) {
            if (favoriteFilms[i]) {
                newFavoriteFilms.push(favoriteFilms[i])
            }
        }
        return newFavoriteFilms
    }

    updateFavorites(pageNumber) {
        this.setState({
            favoriteFilms: this.getFavorites(pageNumber)
        })
    }

    changePage = e => {
        let {selected} = e;
        selected++;
        console.log("selected", selected);
        if (selected) {
            this.props.history.push(`/page/${selected}`);
            this.props.getFilms(selected)
        }
    };
    onPageChangedFavorite = (pageNumber) => {
        this.props.history.push(`/favorites/${pageNumber}`);
        this.updateFavorites(pageNumber)
    };

    displayFilms(films) {
        return films.map((movie) => {
            const {title, vote_average, poster_path, id, genres = [], release_date, genre_ids = 0} = movie;
            return <MovieCart
                title={title}
                rate={vote_average}
                poster={poster_path}
                id={id}
                type={genre_ids ||
                genres.map((genre) => genre.id)
                }
                year={release_date}
                key={id}/>
        })

    }

    render() {
        const {total_pages, page_size} = this.state;
        const {favoriteFilms} = this.props;
        const {films} = this.props;
        const defaultPaginateSettings = {
            previousLabel: '<',
            nextLabel: '>',
            initialPage: this.props.page - 1,
            marginPagesDisplayed: 1,
            pageRangeDisplayed: 2,
        };
        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie__block">
                        {
                            favoriteFilms ? (
                                    this.displayFilms(favoriteFilms)
                                ) :
                                (films &&
                                    this.displayFilms(films)
                                )
                        }
                    </div>
                    <div className="pagination d-flex justify-content-center">
                        {/*   {
                            favoriteFilms && this.props.totalFavoriteFilms > 20 ?
                                (
                                    <ReactPaginate
                                        {...defaultPaginateSettings}
                                        pageCount={Math.ceil(this.props.favoriteFilms.length / page_size)}
                                        onPageChange={this.onPageChangedFavorite}
                                    />
                                ) :
                                (films &&
                                    <ReactPaginate
                                        {...defaultPaginateSettings}
                                        pageCount={this.props.total_pages}
                                        onPageChange={this.changePage}
                                    />
                                )
                        }*/}
                    </div>
                </div>
            </div>
        )
    }

}
;
/*MovieGrid.defaultProps = {
    page: 1,
}*/
MovieGrid.propTypes = {
    page: PropTypes.number,
};
const
    mapStateToProps = state => {
        return {
            genres: state.genres,
            totalFavoriteFilms: state.favorites.length,
            films: state.films.results,
            total_pages: state.films.total_pages
        }
    };

export default withRouter(connect(mapStateToProps, {getFilms})(MovieGrid));



