import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";

import "./App.css";
import AppFooter from "./components/app-footer";
import NowPlayingPage from "./components/pages/now-playing-page";
import MoviePage from "./components/pages/movie-page";
import FavoriteMoviePage from "./components/pages/favorite-movie-page";
import Page404 from "./components/pages/page-404";
import { makeSelectGenres } from "./selectors/genres-selector";
import { fetchGenres } from "./actions/genres-actions";

// ?@decorator
class App extends React.Component {
  componentDidMount() {
    const { getGenres } = this.props;
    getGenres();
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
  getGenres: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGenres: fetchGenres
    },
    dispatch
  );
const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres()
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
