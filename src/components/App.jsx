import React from 'react';

import SalaryTable from './SalaryTable.jsx';
import { SalaryLoadProgressCtx } from '../contexts/Salary';

import SalaryDataLoader from '../helper/SalaryDataLoader'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      salary: [],
      updatedAt: null,
      progress: 0
    }

    this.loadSalaryData();
  }

  loadSalaryData() {
    SalaryDataLoader((progress) => this.setState({progress: progress * 100}))
      .then(json => this.setState({ salary: json.items, updatedAt: json.updated_at }))
  }

  render() {
    return (
      <div className="container">
        <SalaryLoadProgressCtx.Provider value={this.state.progress}>
          <SalaryTable salary={this.state.salary} />
        </SalaryLoadProgressCtx.Provider>
      </div>
      )
  }
}
