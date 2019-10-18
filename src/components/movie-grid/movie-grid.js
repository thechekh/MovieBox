import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
/*import Pagination from "../pagination"*/
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addFavorites, removeFavorites} from "../movie-page/movie-page-actions";

class MovieGrid extends React.Component {
    total_pages;

    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            films: null,
            total_pages: null,
            page_size: 20,
            current_page: 5,
        };

    }
componentDidMount() {
    this.updateFilms()
}

    updateFilms() {
        this.state.api.getFilms(3)
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results,
                    total_pages: newFilms.total_pages,


                });
            })

    }
    setCurrentPage(p){
        this.setState({
            current_page: p,
        })

}

onPageChanged=(pageNumber)=>{
        this.setCurrentPage(pageNumber);
        console.log("PG",pageNumber);
    this.state.api.getFilms(pageNumber).then((newFilms) => {
        this.setState({
            films: newFilms.results,


        });
    })
}

    render() {
        const {films} = this.state;
        const {favoriteFilms} = this.props;
        const pagesCount = this.state.total_pages;
        let pages = [];
        console.log("favfilms", favoriteFilms);

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-flex-start">


                        {favoriteFilms ?
                            (favoriteFilms.map((movie) => {
                                    const {title, vote_average, poster_path, id} = movie;
                                    return <MovieCart title={title} rate={vote_average} poster={poster_path} id={id}
                                                      key={id}/>
                                }
                            ))
                            :
                            (films &&
                                films.map((movie) => {
                                    const {title, vote_average, poster_path, id} = movie;
                                    /*const {name}=movie.genres*/
                                    return <MovieCart title={title} rate={vote_average} poster={poster_path} id={id} /*gengre={name}*/
                                                      key={id}/>
                                }))
                        }
                        </div>
                            {pages.map(p =>{
                                return <span
                                    onClick={()=>{this.onPageChanged(p)}}
                                    className={this.state.current_page === p && "selected"}>{p} </span>
                            })}

                    </div>
                </div>
                )
                }

                };
/*let mapStateToProps = state => {

    return {
        current_page: state.current_page,
    }
}*/

export default MovieGrid;

