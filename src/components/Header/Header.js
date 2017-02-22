import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';

export const Header = ({auth, handleLogout}) => (
  <div>
    <h1>Caxy Front End Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {auth.isAuthenticated ? (
      <div>
        {auth.username}
        <a href="#" onClick={handleLogout}>Logout</a>
      </div>
    ) : ''}
  </div>
);

Header.propTypes = {
  auth: React.PropTypes.object,
  handleLogout: React.PropTypes.func
};

export default Header;
