import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
function App() {
  return (
    <div className="App">
   <AppHeader/>
   <MovieGrid/>
   </div>
  );
}

export default App;
