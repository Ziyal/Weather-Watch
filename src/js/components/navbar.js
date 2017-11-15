import React from 'react';
import PropTypes from 'prop-types';

const Navbar = () => {

    return <div className="navbar">
        <h1 className="nav-title">Title goes here.</h1>
        <input type="text" placeholder="zip code"/>
        <button>Get Weather</button>
    </div>
}

export default Navbar;