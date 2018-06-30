import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import SalaryTable from './SalaryTable.jsx';
import Navbar from './Navbar.jsx';
import {
  SalaryCtx,
  SalaryUpdatedAtCtx,
  SalaryLoadProgressCtx
} from '../contexts/Salary';

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
      .then(json => this.setState({ salary: json.items, updatedAt: json.updated_at * 1000 }))
  }

  render() {
    // TODO: Improve Context Design
    return (
      <Router>
        <div>
          <SalaryLoadProgressCtx.Provider value={this.state.progress}>
            <SalaryCtx.Provider value={this.state.salary}>
              <SalaryUpdatedAtCtx.Provider value={this.state.updatedAt}>
                <Navbar />
                <Route exact path="/" component={SalaryTable} />
              </SalaryUpdatedAtCtx.Provider>
            </SalaryCtx.Provider>
          </SalaryLoadProgressCtx.Provider>
        </div>
      </Router>
      )
  }
}
