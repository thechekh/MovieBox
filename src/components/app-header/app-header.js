import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import cn from "classnames";

import "./app-header.css";
/** Review: мешаешь импорты */
import ReactRouterPropTypes from "react-router-prop-types";

const AppHeader = ({ match }) => {
  let isFavorite = false;
  if (match.path.indexOf("favorites") === 1) {
    isFavorite = true;
  }
  const btnClass = cn({
    header__button__toggled: isFavorite,
    header__button: !isFavorite
  });
  return (
    <div className="header">
      <div className="container header__container">
        <Link to="/">
          <h1 className="header__text">
            themovie<span className="header__box">box</span>
          </h1>
        </Link>

        <Link to="/favorites">
          <button type="button" className={btnClass}>
            <span className="favorites__text">
              Show Favorites <FontAwesomeIcon icon={faStar} />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};
AppHeader.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};

export default withRouter(AppHeader);
