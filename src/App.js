import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import './App.css';
import {getsGenres} from "./components/movie-grid/movie-grid-actions";
import AppFooter from "./components/app-footer";
import NowPlayingPage from "./components/pages/now-playing-page";
import MoviePage from "./components/pages/movie-page";
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
                    <Switch>
                        <Route exact path="/" component={NowPlayingPage}/>
                        <Route path="/page/:page" component={NowPlayingPage}/>
                        {/** REVIEW: что за артефакт на следующей строчке? */}
                        }}
                        />
                        <Route path="/movie/:id" component={MoviePage}/>
                        {/** REVIEW: что за артефакт на следующей строчке? */}
                        }}/>
                        <Route path="/favorites/:page?" component={FavoriteMoviePage}/>
                        {/** REVIEW: что за артефакт на следующей строчке? */}
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


