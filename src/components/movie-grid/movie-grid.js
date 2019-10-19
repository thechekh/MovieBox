import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';

class MovieGrid extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            api: new ApiService(),
            films: null,
            total_pages: null,
            page_size: 20,
            current_page: 1,
        };


    }

    componentDidMount() {
        this.updateFilms()

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

    setCurrentPage(p) {
        this.setState({
            current_page: p,
        })

    }


    onPageChanged = (pageNumber) => {
        this.setCurrentPage(pageNumber);
        console.log("PG", pageNumber);
        this.state.api.getFilms(pageNumber).then((newFilms) => {
            this.setState({
                films: newFilms.results,


            });
        })
    }


    render() {

        const {films} = this.state;
        const {favoriteFilms} = this.props;

        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie_margin">
                        {this.props.genres && favoriteFilms ?
                            (
                                favoriteFilms.map((movie) => {
                                        const {title, vote_average, poster_path, id, genres} = movie;
                                        const genre_ids = genres.map((item) => item.id)
                                        return <MovieCart title={title} rate={vote_average} poster={poster_path} id={id}
                                                          genre={genre_ids}
                                                          key={id}/>
                                    }
                                ))
                            :
                            (this.props.genres && films &&
                                films.map((movie) => {
                                    const {title, vote_average, poster_path, id, genre_ids} = movie;

                                    return <MovieCart title={title} rate={vote_average} poster={poster_path}
                                                      id={id} genre={genre_ids}
                                                      key={id}/>
                                }))

                        }
                        {this.props.genres && console.log("fdf", this.props.genres[0])}
                    </div>

                    <div className="pagination d-flex justify-content-center">
                        {this.state.total_pages ?
                            (
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

                            ) : null
                        }
                    </div>


                </div>
            </div>
        )
    }

};
let mapStateToProps = state => {

    return {
        genres: state.genres,
    }
}
export default connect(mapStateToProps)(MovieGrid);



