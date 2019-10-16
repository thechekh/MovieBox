import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import MoviePage from "./components/movie-page";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <AppHeader/>
                    {/* <MoviePage/>*/}
                    <Route exact path="/" component={MovieGrid}/>
                    <Route path="/movie/:id" render={()=> <MoviePage id="475557"/>}/>
                </div>
            </Router>
        );
    }
}

export default App;
