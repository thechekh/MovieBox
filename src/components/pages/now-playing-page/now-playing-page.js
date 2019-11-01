import React from 'react';

import './now-playing-page.css';
import MovieGrid from "../../movie-grid/movie-grid";
import {connect} from "react-redux";
import {getFilms} from "./now-playing-page-actions"
import Spinner from "../../spinner";


class NowPlayingPage extends React.Component {
    state = {
        loading: true,
    };
    componentDidMount() {
        const {page} = this.props.match.params;
        this.props.getFilms(page).then(() => this.setState({
            loading: false,
        }))
    }
    render() {
        if (this.state.loading) {
            return <Spinner/>
        }
        return (
            <MovieGrid films={this.props.films}/>
        )
    }
}
const
    mapStateToProps = state => {
        return {
            films: state.films.results,
        }
    };
export default connect(mapStateToProps, {getFilms})(NowPlayingPage);


