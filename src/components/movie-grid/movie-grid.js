import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'
import ApiService from "../../services/movie-api";
/*import Pagination from "../pagination"*/
import {setGenres} from "./movie-grid-actions";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addFavorites, removeFavorites} from "../movie-page/movie-page-actions";

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

    GetGenres = () => {
        this.state.api.getGenres()
            .then((res) => setGenres(res))
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
        const pagesCount = this.state.total_pages;
        let pages = [];
        const currentPage = this.state.current_page
        console.log("favfilms", favoriteFilms);

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }


        function createPagination(pages, page) {
            let str = '<ul>';
            let active;
            let pageCutLow = page - 1;
            let pageCutHigh = page + 1;
            // Show the Previous button only if you are on a page other than the first
            if (page > 1) {
                str += '<li class="page-item previous no"><a onClick="createPagination(pages, ' + (page - 1) + ')">Previous</a></li>';
            }
            // Show all the pagination elements if there are less than 6 pages total
            if (pages < 6) {
                for (let p = 1; p <= pages; p++) {
                    active = page == p ? "active" : "no";
                    str += '<li class="' + active + '"><a onClick="createPagination(pages, ' + p + ')">' + p + '</a></li>';
                }
            }
            // Use "..." to collapse pages outside of a certain range
            else {
                // Show the very first page followed by a "..." at the beginning of the
                // pagination section (after the Previous button)
                if (page > 2) {
                    str += '<li class="no page-item"><a onClick="createPagination(pages, 1)">1</a></li>';
                    if (page > 3) {
                        str += '<li class="out-of-range"><a onClick="createPagination(pages,' + (page - 2) + ')">...</a></li>';
                    }
                }
                // Determine how many pages to show after the current page index
                if (page === 1) {
                    pageCutHigh += 2;
                } else if (page === 2) {
                    pageCutHigh += 1;
                }
                // Determine how many pages to show before the current page index
                if (page === pages) {
                    pageCutLow -= 2;
                } else if (page === pages - 1) {
                    pageCutLow -= 1;
                }
                // Output the indexes for pages that fall inside the range of pageCutLow
                // and pageCutHigh
                for (let p = pageCutLow; p <= pageCutHigh; p++) {
                    if (p === 0) {
                        p += 1;
                    }
                    if (p > pages) {
                        continue
                    }
                    active = page == p ? "active" : "no";
                    str += '<li class="page-item ' + active + '"><a onClick="createPagination(pages, ' + p + ')">' + p + '</a></li>';
                }
                // Show the very last page preceded by a "..." at the end of the pagination
                // section (before the Next button)
                if (page < pages - 1) {
                    if (page < pages - 2) {
                        str += '<li class="out-of-range"><a onClick="createPagination(pages,' + (page + 2) + ')">...</a></li>';
                    }
                    str += '<li class="page-item no"><a onClick="createPagination(pages, pages)">' + pages + '</a></li>';
                }
            }
            // Show the Next button only if you are on a page other than the last
            if (page < pages) {
                str += '<li class="page-item next no"><a onClick="createPagination(pages, ' + (page + 1) + ')">Next</a></li>';
            }
            str += '</ul>';
            // Return the pagination string to be outputted in the pug templates
            document.getElementById('pagination').innerHTML = str;
            return str;
        }


        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-flex-start">
                        <button onClick={this.GetGenres}></button>

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
                                    const {genre_ids} = movie
                                    return <MovieCart title={title} rate={vote_average} poster={poster_path}
                                                      id={id} genre={genre_ids}
                                                      key={id}/>
                                }))
                        }
                    </div>

                    {pages.map(p => {
                        return <span
                            onClick={() => {
                                this.onPageChanged(p)
                            }}
                            className={this.state.current_page === p && "selected"} key={p}>{p} </span>
                    })}
                    <div id="pagination"></div>
                    {/*   {this.state.total_pages ? (
                        createPagination(pagesCount, currentPage)
                    ) : null

                    }*/}


                </div>
            </div>
        )
    }

};
/*let mapStateToProps = state => {

    return {
       genres: state.genres,
    }
}*/

export default connect(null, {setGenres})(MovieGrid);



