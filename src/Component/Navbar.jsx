import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
        <NavLink to="/student">
            Student
          </NavLink>
        </li>
        <li>
        <NavLink to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/weathet">
            Weather
          </NavLink>
        </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
