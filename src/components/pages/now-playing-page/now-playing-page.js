import React from "react";

import "./now-playing-page.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MovieGrid from "../../movie-grid/movie-grid";
import getFilms from "./now-playing-page-actions";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

class NowPlayingPage extends React.Component {
  componentDidMount() {
    /** Review: деструктуризация **/
    const { page } = this.props.match.params;
    this.props.getFilms(page);
  }

  changePage = e => {
    let { selected } = e;
    /** Review: ++ убери, писал в другом фале причину **/
    selected++;
    if (selected) {
      /** Review: деструктуризация + опись **/
      this.props.history.push(`/page/${selected}`);
      this.props.getFilms(selected);
    }
  };

  render() {
    /** Review: деструктуризация + опись **/
    const { page } = this.props.match.params;
    const { loading, films, pages } = this.props;

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
  /** Review: опиши правильно **/
  films: PropTypes.array,
  pages: PropTypes.number,
  loading: PropTypes.bool
};
NowPlayingPage.defaultProps = {
  loading: true,
  pages: 1,
  films: []
};
export default connect(
  mapStateToProps,
  { getFilms }
)(NowPlayingPage);
