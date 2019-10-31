import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import './App.css';
import {getsGenres} from "./components/movie-grid/movie-grid-actions";
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import MovieGrid from "./components/movie-grid";
import MovieDetails from "./components/movie-details";
import FavoriteMoviePage from "./components/favorite-movie-page"
import Page404 from "./components/page-404";


class App extends React.Component { //Maybe func Component?

    componentDidMount() {
        this.props.getsGenres();
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <Switch>
                        <Route exact path="/" component={MovieGrid}/>
                        <Route path="/page/:page"
                               {/** REVIEW: зачем делать так, если в кмопонент и так все проспы передадуться, в случае */}
                               {/** REVIEW: если напишешь просто component={MovieGrid} */}
                               {/** REVIEW: в идеале ты должен ссылаться на страницу в таком случае, а не на */}
                               {/** REVIEW: переиспользуемый компонент*/}
                               component={({match}) => {
                                   const {page} = match.params;
                                   return <MovieGrid page={Number(page)}/>
                               }}
                        />
                        {/** REVIEW: аналоично */}
                        <Route path="/movie/:id" component={({match}) => {
                            const {id} = match.params;
                            return < MovieDetails id={Number(id)}/>
                        }}/>
                        <Route path="/favorites/" exact component={FavoriteMoviePage}/>
                        {/** REVIEW: аналоично */}
                        <Route path="/favorites/:page"
                               component={({match}) => {
                                   const {page} = match.params;
                                   return < FavoriteMoviePage page={Number(page)}/>
                               }}/>
                        <Route component={Page404}/>
                    </Switch>

                </div>
                <AppFooter/>
            </Router>
        );
    }
}
export default connect(null, {getsGenres})(App);


