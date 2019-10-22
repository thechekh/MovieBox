import React from 'react';
import './app-header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import ApiService from "../../services/movie-api";

class AppHeader extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            isActive: false
        }
    }


    toggleButtonClass = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        return (
            <div className='header'>
                <div className='container header__container'>
                    <Link to='/'><h1 className='header__text'>themovie<span className='header__box'>BOX</span></h1>
                    </Link>
                    <div className='favorites'>
                        <Link to="/favorites">

                            <button
                                className={this.state.isActive ? 'header__button__toggled' : "header__button"}
                                /*disabled={!this.state.isButtonActive}*/
                                onClick={this.toggleButtonClass}>

<span className="favorites__text">
Show Favorites <FontAwesomeIcon icon={faStar}/>
</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}
;

export default AppHeader;