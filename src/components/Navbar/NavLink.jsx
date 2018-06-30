import React from 'react';
import { Route, Link } from 'react-router-dom';

export default ({children, label, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <li className={match ? "nav-item active" : "nav-item"}>
        <Link className="nav-link" to={to}>{children}</Link>
      </li>
    )}
  />
)
