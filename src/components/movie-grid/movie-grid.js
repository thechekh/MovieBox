import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";

class MovieGrid extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            api: new ApiService(),
            films: null,
            total_pages: null,
            page_size: 20,
            current_page: this.props.page,
            favoriteFilms: null,
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
        this.state.api.getFilms(this.state.current_page)
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results,
                    total_pages: newFilms.total_pages,
                });
            })
    }

    getFavorites(pageNumber) {
        const {favoriteFilms} = this.props;
        const filmCount = pageNumber * 20 - 20;
        const newFavoriteFilms = [];
        for (let i = filmCount; i < filmCount + 20; i++) {
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
        this.state.api.getFilms(pageNumber).then((newFilms) => {
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
            const {title, vote_average, poster_path, id, genres, genre_ids=null ,release_date} = movie;
            if (genres_ids) {

                const genre_ids = genres.map((item) => item.id);
            }
            return <MovieCart
                title={title}
                rate={vote_average}
                poster={poster_path}
                id={id}
                type={genre_ids}
                year={release_date}
                key={id}/>
        })

    }

    render() {
        const {films, total_pages, favoriteFilms} = this.state;

        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie_margin">
                        {
                            this.props.genres && favoriteFilms ?
                                (
                                    this.displayFilms(favoriteFilms)
                                ) : null
                        }

                        {
                            (this.props.genres && films &&
                                films.map((movie) => {
                                    const {title, vote_average, poster_path, id, genre_ids, release_date} = movie;

                                    return <MovieCart
                                        title={title}
                                        rate={vote_average}
                                        poster={poster_path}
                                        id={id}
                                        type={genre_ids}
                                        year={release_date}
                                        key={id}/>
                                }))
                        }

                    </div>

                    <div className="pagination d-flex justify-content-center">
                        {this.state.favoriteFilms ?
                            (
                                <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    initialPage={this.props.page - 1}
                                    pageCount={Math.ceil(this.props.favoriteFilms.length / 20)}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={e => {
                                        this.onPageChangedFavorite(e.selected + 1)
                                    }
                                    }
                                />

                            ) :
                            (total_pages &&
                                <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    initialPage={this.props.page - 1}
                                    pageCount={this.state.total_pages}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={e => {
                                        console.log(e.selected + 1, "sl");
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
let
    mapStateToProps = state => {

        return {
            genres: state.genres,
        }
    }
export default withRouter(connect(mapStateToProps)(MovieGrid));



