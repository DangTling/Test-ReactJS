import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.scss";

class Nav extends React.Component {
  render() {
    return (
      <div className="topnav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/list-users">List User</NavLink>
      </div>
    );
  }
}
export default Nav;
