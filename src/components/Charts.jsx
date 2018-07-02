import React from 'react';

// TODO: Reuse chart if have same display and rule
import AgeSalaryChart from './Charts/AgeSalaryChart.jsx';
import YearSalaryChart from './Charts/YearSalaryChart.jsx';
import CitySalaryChart from './Charts/CitySalaryChart.jsx';

import { SalaryCtx } from '../contexts/Salary';
import { SalaryToChart } from '../helper/Chart';

const ChartSection = ({label, items, component}) => (
  <div className="row single-chart">
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
        <ChartSection label="年資與薪資分佈" items={this.state.salary} component={YearSalaryChart} />
        <ChartSection label="地區與薪資分佈" items={this.state.salary} component={CitySalaryChart} />
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
