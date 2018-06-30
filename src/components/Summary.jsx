import React from 'react';

import Salary from './Summary/Salary.jsx';

import {
  SalaryCtx
} from '../contexts/Salary';

import { SalaryToChart } from '../helper/Chart';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      salary: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.salary.length == prevState.salary.length) {
      return null;
    }

    return {
      salary: SalaryToChart(nextProps.salary)
    }
  }

  render() {
    return (
      <div className="container summary">
        <Salary items={this.state.salary} />
      </div>
    )
  }
}

export default () => (
  <SalaryCtx.Consumer>
    {items => <Summary salary={items} />}
  </SalaryCtx.Consumer>
)
