import React from 'react';

import './movie-page.css';
import MovieDetails from "../../movie-details"


class MoviePage extends React.Component {

    render() {
        const {id} = this.props.match.params;
        return (
            <MovieDetails id={Number(id)}/>
        )
    }
}

export default (MoviePage);


