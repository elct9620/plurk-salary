import React from 'react';
import { Link } from 'react-router-dom';

import NavLink from './Navbar/NavLink.jsx';

import {
  SalaryCtx,
  SalaryUpdatedAtCtx,
} from '../contexts/Salary';

const ReportCaption = ({count, updatedAt}) => (
  <span className="navbar-text">
    {(new Date(updatedAt)).toLocaleString()} - {count} 筆
  </span>
)

export default (props) => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
      <Link to="/" className="navbar-brand">噗浪薪資普查</Link>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <NavLink exact to="/">首頁</NavLink>
        <NavLink to="/chart">圖表</NavLink>
      </ul>
      <SalaryCtx.Consumer>
        {items => (
        <SalaryUpdatedAtCtx.Consumer>
          {updatedAt => <ReportCaption count={items.length} updatedAt={updatedAt} />}
        </SalaryUpdatedAtCtx.Consumer>
        )}
      </SalaryCtx.Consumer>
    </nav>
  )
}
