import React from 'react';

import Row from './SalaryTable/Row.jsx';
import FilterButton from './FilterButton.jsx';
import {
  SalaryCtx,
  SalaryLoadProgressCtx
} from '../contexts/Salary';

import SalarySorter from '../helper/SalarySorter';

export default class SalaryTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'rid',
      asc: true
    }
  }

  sort(items) {
    const column = this.state.sort;
    const sortBy = this.state.asc ? 'asc' : 'desc';
    const fn = SalarySorter[column][sortBy];

    if (fn == undefined) {
      return items;
    }

    return items.sort(fn);
  }

  salaryRow(items) {
    return this.sort(items).map(salary => {
      return (<Row key={salary.rid} {...salary} />);
    });
  }

  currentSort(column) {
    if (this.state.sort == column) {
      return this.state.asc ? 'asc' : 'desc';
    }

    return false;
  }

  sortBy(column) {
    return () => {
      this.setState({
        sort: column,
        asc: (this.state.sort == column) ? !this.state.asc : true
      })
    }
  }

  render() {
    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th><FilterButton onClick={this.sortBy('rid')} current={this.currentSort('rid')}>RID</FilterButton></th>
            <th><FilterButton onClick={this.sortBy('age')} current={this.currentSort('age')}>年齡</FilterButton></th>
            <th>工作地點</th>
            <th>職業</th>
            <th>學歷</th>
            <th><FilterButton onClick={this.sortBy('year')} current={this.currentSort('year')}>年資</FilterButton></th>
            <th><FilterButton onClick={this.sortBy('salary')} current={this.currentSort('salary')}>薪資</FilterButton></th>
          </tr>
        </thead>
        <tbody>
          <SalaryCtx.Consumer>
            {items => this.salaryRow(items)}
          </SalaryCtx.Consumer>
        </tbody>
      </table>
    )
  }
}
