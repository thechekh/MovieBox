import React from 'react';
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import MovieGrid from "./components/movie-grid";
import MovieDetails from "./components/movie-details";
import FavoriteMoviePage from "./components/favorite-movie-page"
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {setGenres} from "./components/movie-grid/movie-grid-actions";
import {connect} from "react-redux";
import {getGenres} from "./services/movie-api";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getGenres: getGenres,
        };
    }
    componentDidMount() {
        this.GetGenres();
    }

    GetGenres = () => {
        this.state.getGenres()
            .then((res) => this.props.setGenres(res))

    };

    render() {
        return (
            <Router>
                <div className="app">

                    <AppHeader/>
                    <Switch>
                        <Route exact path="/" component={MovieGrid}/>
                        <Route path="/page/:page" render={({match}) => {
                            const {page} = match.params;
                            return < MovieGrid page={Number(page)}/>
                        }}/>
                        <Route path="/movie/:id" render={({match}) => {
                            const {id} = match.params;
                            return < MovieDetails id={Number(id)}/>
                        }}/>
                        <Route path="/favorites/:page" render={({match}) => {
                            const {page} = match.params;
                            return < FavoriteMoviePage page={Number(page)}/>
                        }}/>
                        <Route path="/favorites/" exact render={() => {

                            return < FavoriteMoviePage/>
                        }}/>

                        <Route render={() => {
                            return <h2 className="error_page">page not found</h2>
                        }}/>

                    </Switch>
                </div>
                <AppFooter/>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return {
        genres: state.genres,
    }
}
export default connect(mapStateToProps, {setGenres})(App);


