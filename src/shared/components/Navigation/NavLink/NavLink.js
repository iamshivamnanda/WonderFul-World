import React,{useContext} from 'react';
import { NavLink as NL } from "react-router-dom";
import { AuthContext } from '../../../context/auth-context';
import "./NavLink.css"

const NavLink = () => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NL to="/" exact>ALL USERS</NL>
            </li>
            {auth.isLoggedIn && (
        <li>
          <NL to="/u1/places">MY PLACES</NL>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NL to="/places/new">ADD PLACE</NL>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NL to="/auth">AUTHENTICATE</NL>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
        </ul>
    )
}

export default NavLink;
