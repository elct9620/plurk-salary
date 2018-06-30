import React from 'react';

import SalarySorter from '../../helper/SalarySorter';
import {
  Median,
  Average,
  Max,
  Min,
  SelectAge
} from '../../helper/Chart';

const format = (num) => Math.round(num / 10) / 100 + "K"

const Row = ({age, average, median, max, min, count}) => (
  <tr>
    <th>{age}</th>
    <td className="text-right">{format(average)}</td>
    <td className="text-right">{format(median)}</td>
    <td className="text-right">{format(max)}</td>
    <td className="text-right">{format(min)}</td>
    <td className="text-right">{count} 筆</td>
  </tr>
)

export default class Salary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sorted: [],
      average: 0,
      median: 0,
      max: 0,
      min: 0,
      maxAge: 0,
      minAge: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items.length == prevState.sorted.length) {
      return null;
    }

    const sorted = nextProps
      .items
      .sort(SalarySorter.salary.asc)
      .map(item => item['salary'])

    const sortedAge = nextProps
      .items
      .sort(SalarySorter.age.asc)
      .map(item => item['age'])

    return {
      sorted: sorted,
      median: Median(sorted),
      average: Average(sorted),
      max: Max(sorted),
      min: Min(sorted),
      maxAge: Max(sortedAge),
      minAge: Min(sortedAge)
    }
  }

  rowsByAge() {
    const rows = [];
    for (let i = this.state.minAge; i < this.state.maxAge; i++) {
      let filtered =
        this.props.items
        .filter(SelectAge(i, i))
        .sort(SalarySorter.salary.asc)
        .map(item => item['salary'])

      if (filtered.length == 0) {
        continue;
      }

      let average = Average(filtered);
      let median = Median(filtered);
      let max = Max(filtered);
      let min = Min(filtered);

      rows.push(
        <Row
          key={i}
          age={i}
          average={average}
          median={median}
          max={max}
          min={min}
          count={filtered.length}
        />
      )
    }
    return rows;
  }

  render() {
    return (
      <table className="table table-stripted">
        <thead className="thead-dark">
          <tr>
            <th>年齡</th>
            <th className="text-right">平均值</th>
            <th className="text-right">中位數</th>
            <th className="text-right">最大值</th>
            <th className="text-right">最小值</th>
            <th className="text-right">樣本數</th>
          </tr>
        </thead>
        <tbody>
          <Row
            age="全部"
            average={this.state.average}
            median={this.state.median}
            max={this.state.max}
            min={this.state.min}
            count={this.state.sorted.length}
          />
          {this.rowsByAge()}
        </tbody>
      </table>
    )
  }
}
