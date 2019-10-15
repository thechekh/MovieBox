import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'

class MovieGrid extends React.Component {
    componentDidMount() {

    }

    onPlanetsLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };

    render() {

        return (<div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-between">
                        <MovieCart/>
                        <MovieCart/>
                        <MovieCart/>
                        <MovieCart/>

                        <MovieCart/>
                        <MovieCart/>
                        <MovieCart/>
                        <MovieCart/>

                        <MovieCart/>
                        <MovieCart/>
                        <MovieCart/>
                        <MovieCart/>
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