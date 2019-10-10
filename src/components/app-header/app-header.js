import React from 'react';
import './app-header.css';

const AppHeader = () => {
    return (
        <div className='header'>
            <div className='container flexible'>

                <h1>THEMOVIEBOX</h1>
                <div className='favorites'>
                    <button>Show Favorites *</button>
                    <button>Show Favorites *</button>
                </div>
             </div>
        </div>
    )

};

export default AppHeader;