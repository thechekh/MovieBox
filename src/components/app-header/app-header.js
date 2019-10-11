import React from 'react';
import './app-header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'

const AppHeader = () => {
    return (
        <div className='header'>
            <div className='container flexible'>
                <h1 className='header__text'>THEMOVIE <span className='header__box'>BOX</span></h1>
                <div className='favorites'>
                    <button>
                        <span className="favorites__text">
                        Show Favorites <FontAwesomeIcon icon={faStar} />
                        </span>
                    </button>
                </div>
             </div>
        </div>
    )

};

export default AppHeader;