import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./App.css";
import getsGenres from "./actions/genres-actions";
import AppFooter from "./components/app-footer";
import NowPlayingPage from "./components/pages/now-playing-page";
import MoviePage from "./components/pages/movie-page";
import FavoriteMoviePage from "./components/pages/favorite-movie-page";
import Page404 from "./components/pages/page-404";

class App extends React.Component {
  componentDidMount() {
    const { genres } = this.props;
    genres();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={NowPlayingPage} />
            <Route path="/page/:page" component={NowPlayingPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/favorites/:page?" component={FavoriteMoviePage} />
            <Route component={Page404} />
          </Switch>
        </div>
        <AppFooter />
      </Router>
    );
  }
}

App.propTypes = {
  genres: PropTypes.func.isRequired
};
export default connect(
  null,
  { genres: getsGenres }
)(App);
