import React from "react";

import "./now-playing-page.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { bindActionCreators } from "redux";

import { fetchFilms } from "../../../actions/now-playing-page-actions";
import MovieGrid from "../../movie-grid/movie-grid";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

class NowPlayingPage extends React.Component {
  componentDidMount() {
    const { getFilms, match } = this.props;
    const { page } = match.params;
    getFilms(page);
  }

  changePage = e => {
    const { history, getFilms } = this.props;
    const { selected } = e;
    const page = selected + 1;
    history.push(`/page/${page}`);
    getFilms(page);
  };

  render() {
    const { loading, films, pages, match } = this.props;
    const { page } = match.params;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <AppHeader />
        <MovieGrid films={films} />
        <Pagination
          initialPage={Number(page) || 1}
          pageCount={pages}
          changePage={this.changePage}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    films: state.films.results,
    loading: state.films.loading,
    pages: state.films.total_pages
  };
};

NowPlayingPage.propTypes = {
  getFilms: PropTypes.func.isRequired,
  films: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired
    })
  ),
  pages: PropTypes.number,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  loading: PropTypes.bool
};
NowPlayingPage.defaultProps = {
  loading: true,
  pages: 1,
  films: []
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFilms: fetchFilms
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlayingPage);
