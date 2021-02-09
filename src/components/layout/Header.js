import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    <div className='nav-wrapper'>
      <NavLink to='/' exact className='brand-logo' activeClassName='nav-active'>
        Contact App
      </NavLink>
      <ul id='nav-mobile' className='right'>
        <li>
          {' '}
          <NavLink to='/' exact activeClassName='nav-active'>
            Home
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink to='/add' activeClassName='nav-active'>
            Add Contact
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink to='/about' exact activeClassName='nav-active'>
            About
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
