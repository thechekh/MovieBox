import React from 'react';
import './app-footer.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faPinterestP, faTwitter, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

const AppFooter = () => {
    return (
        <div className="container-fluid footer__container ">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <h2 className="footer__text">themovie<span className='footer__box'>box</span></h2>
                    {/*    <ul>
                        <li>About</li>
                        <li>Movies</li>
                        <li>Ratings</li>
                        <li>Contact</li>
                    </ul>*/}
                    <div className="footer__menu">
                        <a href="#About">About</a>
                        <a href="#Movies">Movies</a>
                        <a href="#Ratings">Ratings</a>
                        <a href="#Contact">Contact</a>
                    </div>
                </div>
                <hr/>
                <div className="row justify-content-between footer__icons">
                    <h4>Designed by Milan Houter. All rights reserved.</h4>
                    <ul>
                        <li><FontAwesomeIcon icon={faFacebookF}/></li>
                        <li><FontAwesomeIcon icon={faPinterestP}/></li>
                        <li><FontAwesomeIcon icon={faTwitter}/></li>
                        <li><FontAwesomeIcon icon={faLinkedinIn}/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default AppFooter;