import React from "react";

import "./now-playing-page.css";
import { connect } from "react-redux";
import MovieGrid from "../../movie-grid/movie-grid";
import { getFilms } from "./now-playing-page-actions";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

class NowPlayingPage extends React.Component {
  componentDidMount() {
    const { page } = this.props.match.params;
    this.props.getFilms(page);
  }

  changePage = e => {
    let { selected } = e;
    selected++;
    if (selected) {
      this.props.history.push(`/page/${selected}`);
      this.props.getFilms(selected);
    }
  };

  render() {
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
          initialPage={page || 1}
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
export default connect(
  mapStateToProps,
  { getFilms }
)(NowPlayingPage);
