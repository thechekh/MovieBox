import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import './App.css';
import {getsGenres} from "./components/movie-grid/movie-grid-actions";
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import MovieGrid from "./components/movie-grid";
import NowPlayingPage from "./components/pages/now-playing-page";
import MovieDetails from "./components/movie-details";
import FavoriteMoviePage from "./components/pages/favorite-movie-page"
import Page404 from "./components/pages/page-404";


class App extends React.Component { //Maybe func Component?

    componentDidMount() {
        this.props.getsGenres();
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <Switch>
                        <Route exact path="/" component={NowPlayingPage}/>
                        <Route path="/page/:page" component={NowPlayingPage}/>
                        }}
                        />
                        <Route path="/movie/:id" component={({match}) => {
                            const {id} = match.params;
                            return < MovieDetails id={Number(id)}/>
                        }}/>
                        <Route path="/favorites/" exact component={FavoriteMoviePage}/>
                        <Route path="/favorites/:page"
                               component={({match}) => {
                                   const {page} = match.params;
                                   return < FavoriteMoviePage page={Number(page)}/>
                               }}/>
                        <Route component={Page404}/>
                    </Switch>

                </div>
                <AppFooter/>
            </Router>
        );
    }
}

export default connect(null, {getsGenres})(App);


