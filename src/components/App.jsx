import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import SalaryTable from './SalaryTable.jsx';
import Navbar from './Navbar.jsx';
import ProgressBar from './ProgressBar.jsx';
import Charts from './Charts.jsx';
import {
  SalaryCtx,
  SalaryUpdatedAtCtx,
  SalaryLoadProgressCtx
} from '../contexts/Salary';

import SalaryDataLoader from '../helper/SalaryDataLoader'

const LoadingView = ({progress}) => (
  <div className="container loading">
    <ProgressBar progress={progress} />
  </div>
)

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
    SalaryDataLoader((progress) => this.setState({progress: progress}))
      .then(json => this.setState({ salary: json.items, updatedAt: json.updated_at * 1000 }))
  }

  loadingOrDisplay() {
    if (this.state.progress >= 100) {
      return (
        <div>
          <Route exact path="/" component={SalaryTable} />
          <Route exact path="/chart" component={Charts} />
        </div>
      )
    }

    return <LoadingView progress={this.state.progress} />
  }

  render() {
    // TODO: Improve Context Design
    return (
      <Router>
        <div>
          <SalaryCtx.Provider value={this.state.salary}>
            <SalaryUpdatedAtCtx.Provider value={this.state.updatedAt}>
              <Navbar />
              {this.loadingOrDisplay()}
            </SalaryUpdatedAtCtx.Provider>
          </SalaryCtx.Provider>
        </div>
      </Router>
      )
  }
}
