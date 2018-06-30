import React from 'react';

import AgeSalaryChart from './Charts/AgeSalaryChart.jsx';

import { SalaryCtx } from '../contexts/Salary';
import { SalaryToChart } from '../helper/Chart';

const ChartSection = ({label, items, component}) => (
  <div className="row">
    <div className="col-md-12">
      <h2 className="chart-title">{label}</h2>
      {React.createElement(component, {items})}
    </div>
  </div>
)

class Charts extends React.Component {
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
      <div className="container charts">
        <ChartSection label="年齡與薪資分佈" items={this.state.salary} component={AgeSalaryChart} />
      </div>
    )
  }
}

export default () => (
  (
    <SalaryCtx.Consumer>
      {items => <Charts salary={items} />}
    </SalaryCtx.Consumer>
  )
)
