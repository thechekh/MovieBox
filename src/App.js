import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import ApiService from "./services/movie-api";


class App extends React.Component  {


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
