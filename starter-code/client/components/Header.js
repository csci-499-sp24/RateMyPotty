import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';




function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header bg-dark text-light py-3">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center">
            <img src="/basic.png" alt="Rate My Potty Logo" className="logo-img mr-2" />
          </div>
          <h1 className="m-0">Rate My Potty</h1>
          <div className="header-icons d-flex align-items-center">
            <button className="toggle-button" onClick={toggleDarkMode}>
              {darkMode ? "🌞" : "🌙"}
            </button>
            <form className="form-inline">
              <div className="input-group">
                <input type="text" className="form-control form-control-sm" placeholder="Search..." />
                <div className="input-group-append">
                  <button className="btn btn-outline-light" type="button">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;