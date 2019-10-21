import React from 'react';
import './app-header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const AppHeader = () => {
    return (
        <div className='header'>
            <div className='container header__container'>
                <Link to='/'><h1 className='header__text'>themovie<span className='header__box'>BOX</span></h1></Link>
                <div className='favorites'>
                    <Link to="/favorites">
                        <button className="header__button">
                        <span className="favorites__text">
                        Show Favorites <FontAwesomeIcon icon={faStar}/>
                        </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )

};

export default AppHeader;