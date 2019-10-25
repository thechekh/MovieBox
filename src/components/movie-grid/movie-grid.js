import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import {getFilms} from "../../services/movie-api";
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";

class MovieGrid extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            getFilms: getFilms,
            films: null,
            favoriteFilms: null,
            total_pages: null,
            page_size: 20,
            current_page: this.props.page,
        };
        if (this.props.favoriteFilms) {
            this.state.favoriteFilms = this.getFavorites(this.state.current_page)
        }
    }

    componentDidMount() {
        if (!this.props.favoriteFilms) {
            this.setFilms()
        }
    }

    setFilms() {
        this.state.getFilms(this.state.current_page)
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results,
                    total_pages: newFilms.total_pages,
                });
            })
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

    setCurrentPage(page) {
        this.setState({
            current_page: page,
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.history.push(`/page/${pageNumber}`);
        this.setCurrentPage(pageNumber);
        this.state.getFilms(pageNumber).then((newFilms) => {
            this.setState({
                films: newFilms.results,
            });
        })

    };
    onPageChangedFavorite = (pageNumber) => {
        this.props.history.push(`/favorites/${pageNumber}`);
        this.setCurrentPage(pageNumber);
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
        const {films, favoriteFilms, total_pages, page_size} = this.state;
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
                            favoriteFilms &&
                            this.displayFilms(favoriteFilms)
                        }
                        {
                            films &&
                            this.displayFilms(films)
                        }
                    </div>

                    <div className="pagination d-flex justify-content-center">
                        {
                            favoriteFilms && this.props.totalFavoriteFilms > 20 ?
                                (
                                    <ReactPaginate
                                        {...defaultPaginateSettings}
                                        pageCount={Math.ceil(this.props.favoriteFilms.length / page_size)}
                                        onPageChange={e => {
                                            this.onPageChangedFavorite(e.selected + 1)
                                        }
                                        }
                                    />
                                ) :
                                (films &&
                                    <ReactPaginate
                                        {...defaultPaginateSettings}
                                        pageCount={total_pages}
                                        onPageChange={e => {
                                            this.onPageChanged(e.selected + 1)
                                        }
                                        }
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }

}
;
MovieGrid.defaultProps = {
    page: 1,
}
MovieGrid.propTypes = {
    page: PropTypes.number,
};
const
    mapStateToProps = state => {
        return {
            genres: state.genres,
            totalFavoriteFilms: state.favorites.length
        }
    }
export default withRouter(connect(mapStateToProps)(MovieGrid));



