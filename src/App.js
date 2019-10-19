import React from 'react';
import AppHeader from "./components/app-header";
import MovieGrid from "./components/movie-grid";
import './App.css';
import MoviePage from "./components/movie-page";
import FavoriteMoviePage from "./components/favorite-movie-page"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {setGenres, l} from "./components/movie-grid/movie-grid-actions";
import {connect} from "react-redux";
import ApiService from "./services/movie-api";

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            api: new ApiService(),
        };


    }
    componentDidMount() {
        this.GetGenres();
    }

    GetGenres = () => {
        this.state.api.getGenres()
            .then((res) => this.props.l(res))

    }

    render() {
        return (
            <Router>
                <div className="App">
                    <AppHeader/>
                    <Switch>
                        <Route exact path="/" component={MovieGrid}/>
                        <Route path="/movie/:id" render={({match}) => {
                            const {id} = match.params
                            return < MoviePage id={id}/>
                        }}/>
                        <Route path="/favorites/" render={({match}) => {

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
let mapStateToProps = state => {

    return {
        genres: state.genres,
    }
}
export default connect(mapStateToProps, {setGenres, l})(App);


