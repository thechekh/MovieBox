import React from 'react';

import './movie-page.css';
import MovieDetails from "../../movie-details"
import AppHeader from "../../app-header";


class MoviePage extends React.Component {

    render() {
        const {id} = this.props.match.params;
        return (
            <>
                <AppHeader/>
                <MovieDetails id={Number(id)}/>
            </>
        )
    }
}

export default (MoviePage);


