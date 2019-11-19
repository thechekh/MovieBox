import React from "react";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import "./now-playing-page.css";
import MovieGrid from "../../movie-grid/movie-grid";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

interface IProps extends RouteComponentProps {
  match: {
    isExact: boolean;
    path: string;
    url: string;
    params: any;
  };
  filmsStore: {
    films: any;
    results: any;
    loading: boolean;
    fetchFilms: (page: number) => void;
  };
}

@inject("filmsStore")
@observer
class NowPlayingPage extends React.Component<IProps> {
  componentDidMount() {
    const { match, filmsStore } = this.props;
    const { page } = match.params;
    filmsStore.fetchFilms(page);
  }

  changePage = (e: any) => {
    const { history, filmsStore } = this.props;
    const { selected } = e;
    const page = selected + 1;

    history.push(`/page/${page}`);
    filmsStore.fetchFilms(page);
  };

  render() {
    console.log("history", this.props.history);
    const { match, filmsStore } = this.props;
    const { loading, films } = filmsStore;
    const { page } = match.params;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <AppHeader />
        <MovieGrid films={films.results} />
        <Pagination
          initialPage={Number(page) || 1}
          pageCount={films.total_pages}
          changePage={this.changePage}
        />
      </>
    );
  }
}

export default NowPlayingPage;
