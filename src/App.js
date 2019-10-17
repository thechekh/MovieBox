import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import MoviePage from "./components/movie-page";
import FavoriteMoviePage from "./components/favorite-movie-page"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props)


    }




    render() {
        return (
            <Router>
                <div className="App">
                    <AppHeader/>
                    {/* <MoviePage/>*/}
                    <Switch>
                        <Route exact path="/" component={MovieGrid}/>
                        <Route path="/movie/:id" render={({match}) => {
                            const {id} = match.params
                            return < MoviePage changeFunc={this.changeFavorite} id={id}/>
                        }}/>
                        <Route path="/favorites/" render={({match}) => {
                            const {id} = match.params
                            return < FavoriteMoviePage/>
                        }}/>
                        <Route render={() => {
                            return <h2 class="error_page">page not found</h2>
                        }}/>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
