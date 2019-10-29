import React from 'react';

import './spinner.css';

const Spinner = () => {
    return (
        <div className="container movie__spinner">
                <div className="lds-double-ring">
                    <div></div>
                    <div></div>
                </div>

        </div>
    );
};

export default Spinner;
