import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import ApiService from "./services/movie-api";


class App extends React.Component  {

    state = {
      api: new ApiService(),
        films:null
    };

    componentDidMount() {
      this.state.api.getFilms()
        .then((newFilms) => {
            this.setState({
               films:newFilms
            });
        });
}

    render() {
      return (
          <div className="App">
              <AppHeader/>
              <MovieGrid films={this.state.films}/>
          </div>
      );
  }
}

export default App;
