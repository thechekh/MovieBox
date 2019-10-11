import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import ApiService from "./services/movie-api";


class App extends React.Component  {

    state = {
      api: new ApiService(),
        isLoggedIn: false,
        films:null
    };
// getFilms=()=> {
// this.state.api.getFilms().then
// }
    componentDidMount() {
        this.setState({
            films:this.state.api.getFilms()
        });
    }

    render() {
      return (
          <div className="App">
              <AppHeader/>
              <MovieGrid/>
          </div>
      );
  }
}

export default App;
