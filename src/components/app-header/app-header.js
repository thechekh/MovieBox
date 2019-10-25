import React from 'react';
import './app-header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'

const AppHeader = ({location}) => {
    let header_class = location.pathname.indexOf('favorites');
    header_class === 1 ?
        header_class = "header__button__toggled"
        :
        header_class = "header__button";
    return (
        <div className='header'>
            <div className='container header__container'>
                <Link to='/'>
                    <h1 className='header__text'>themovie<span className='header__box'>box</span></h1>
                </Link>

                <Link to="/favorites">
                    <button className={header_class}>
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