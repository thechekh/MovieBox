import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import cn from 'classnames'

import './app-header.css';


const AppHeader = ({match, location, history}) => {
    console.log("match", match)
    console.log("location", location)
    let isFavorite = false;
    if (location.pathname.indexOf('favorites') === 1) {
        isFavorite = true;
    }
    let btnClass = cn({
        'header__button__toggled': isFavorite,
        'header__button': !isFavorite
    });
    return (
        <div className='header'>
            <div className='container header__container'>
                <Link to='/'>
                    <h1 className='header__text'>themovie<span className='header__box'>box</span></h1>
                </Link>

                <Link to="/favorites">
                    <button className={btnClass}>
                                <span className="favorites__text">
                                Show Favorites <FontAwesomeIcon icon={faStar}/>
                                </span>
                    </button>
                </Link>

            </div>
        </div>
    )
};

export default withRouter(AppHeader);