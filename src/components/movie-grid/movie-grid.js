import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';
import history from '../../history';

class MovieGrid extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            api: new ApiService(),
            films: null,
            total_pages: null,
            page_size: 20,
            current_page: this.props.page,

        };


    }

    componentDidMount() {
        if (this.props.favoriteFilms) {
            this.updateFavorites()
        } else {
            this.updateFilms()
        }


    }

    updateFilms() {
        this.state.api.getFilms(this.state.current_page)
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results,
                    total_pages: newFilms.total_pages,


                });
            })

    }

    updateFavorites() {
        const {favoriteFilms} = this.props;
        const page = this.state.current_page;

        console.log('page=', page * 20 - 20)
        const pageCount = page * 20 - 20;
        const newFav = []

        for (let i = pageCount; i < pageCount + 20; i++) {
            newFav.push(favoriteFilms[i])
        }

        this.setState({
            newFav: newFav

        });

    }

    setCurrentPage(p) {
        this.setState({
            current_page: p,
        })

    }

    onPageChanged = (pageNumber) => {
        /* window.location.href=`http://localhost:3000/page/${pageNumber}`*/

        /*      this.props.history.push(`page/${pageNumber}`)*/
        /* browserHistory.push(`page/${pageNumber}`);*/
        console.log(' this.props.params ', this.props.params)
        history.push(`/page/${pageNumber}`);
        this.setCurrentPage(pageNumber);
        console.log("PG", pageNumber);
        this.state.api.getFilms(pageNumber).then((newFilms) => {
            this.setState({
                films: newFilms.results,


            });
        })
        console.log('redirect page', `page/${pageNumber}`)

    }
    onPageChangedFavorite = (pageNumber) => {

        history.push(`/favorites/${pageNumber}`);
        this.setCurrentPage(pageNumber);
        console.log("PG", pageNumber);

    }


    render() {

        const {films} = this.state;
        const {favoriteFilms} = this.props;
        const {total_pages} = this.state;


        favoriteFilms && console.log("count favfilms=", favoriteFilms.length)


        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie_margin">
                        {
                            this.props.genres && favoriteFilms && this.state.current_page === 1 ?
                                (
                                    this.props.favoriteFilms.map((movie) => {
                                            const {title, vote_average, poster_path, id, genres, release_date} = movie;
                                            const genre_ids = genres.map((item) => item.id)
                                            return <MovieCart
                                                title={title}
                                                rate={vote_average}
                                                poster={poster_path}
                                                id={id}
                                                type={genre_ids}
                                                year={release_date}
                                                key={id}/>
                                        }
                                    )
                                )
                                : null
                        }
                        {
                            this.props.genres && favoriteFilms && this.state.current_page !== 1 ?
                                (
                                    this.state.newFav.map((movie) => {
                                            const {title, vote_average, poster_path, id, genres, release_date} = movie;
                                            const genre_ids = genres.map((item) => item.id)
                                            return <MovieCart
                                                title={title}
                                                rate={vote_average}
                                                poster={poster_path}
                                                id={id}
                                                type={genre_ids}
                                                year={release_date}
                                                key={id}/>
                                        }
                                    )) : null
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
                        {favoriteFilms ?
                            (
                                <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    pageCount={Math.ceil(this.props.favoriteFilms.length)}
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

};

let
    mapStateToProps = state => {

        return {
            genres: state.genres,
        }
    }
export default connect(mapStateToProps)

(
    MovieGrid
)
;



