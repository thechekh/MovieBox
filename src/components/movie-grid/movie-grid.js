import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";


class MovieGrid extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            films: null,
            mov: '15'
        };
        console.log('constructor state', this.state)
        this.updateFilms()
    }

    /* componentDidMount() {
         this.state.api.getFilms()
             .then((newFilms) => {
                 this.setState({
                     films: newFilms
                 });
             })
             .then(() => console.log("state films", this.state.films.results))
             .then(() => {
                 const elements = this.state.films.results.map((movie) => {
                     const {title, vote_average} = movie;
                     console.log("TITLE", title, 'vote', vote_average)
                     return <MovieCart title={title} rate={vote_average}/>
                 });
                 console.log(elements)
             })
     }*/
    updateFilms() {
        this.state.api.getFilms()
            .then((newFilms) => {
                this.setState({
                    films: newFilms.results
                });
            }).then(() => console.log('state updated', this.state))

    }

    render() {

        const {films} = this.state;

        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-between">

                        {films&&
                            films.map((movie) => {
                            const {title, vote_average} = movie;
                           return  <MovieCart title={title} rate={vote_average}/>
                        })
                        }

                    </div>
                    <div className="row justify-content-center">

                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous"><span
                                        aria-hidden="true">&lt;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&gt;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>
            </div>
        )
    }

};

export default MovieGrid;