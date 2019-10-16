import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import MoviePage from "./components/movie-page";
import Link from "react-router-dom";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import ApiService from "./services/movie-api";

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            favorites: []
        };

    }

    changeFavorite = (id) => {
        const favorites = this.state.favorites.concat(id);
        this.setState({
            favorites
        });
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
