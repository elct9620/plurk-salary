import React from 'react';
import Chart from 'chart.js';

import {
  GroupBy,
  PickUp,
  Average,
  Median
} from '../../helper/Chart';

const GroupByCity = GroupBy('city')
const PickUpSalary = PickUp('salary')
const SummaryToBar = (items) => {
  const citys = GroupByCity(items);
  const labels = [];
  const average = [];
  const median = [];
  for(let city in citys) {
    let salary = PickUpSalary(citys[city]);
    labels.push(city);
    average.push(Average(salary));
    median.push(Median(salary));
  }

  return {
    datasets: [{
      label: '平均值',
      data: average,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)'
    }, {
      label: '中位數',
      data: median,
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgb(255, 159, 64)'
    }],
    labels: labels
  };
}

export default class CityAverageSalaryChart extends React.Component {
  constructor(props) {
    super(props);

    this.chart = null;
    this.chartRef = React.createRef();
    this.summary = SummaryToBar(this.props.items);
  }

  componentDidMount() {
    this.chart = new Chart(
      this.chartRef.current,
      {
        type: 'horizontalBar',
        data: this.summary,
        options: {
          scales: {
            xAxes: [{
              ticks: {
                callback: function(label, index, labels) {
                  return label / 1000 + "K";
                }
              }
            }]
          }
        }
      }
    )
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.items.length != this.props.items) {
      this.summary = SummaryToBar(this.props.items);
      return this.summary;
    }

    return null;
  }

  componentDidUpdate(props, state, snapshot) {
    this.chart.data = this.summary;
    this.chart.update();
  }

  render() {
    return (
      <canvas height="400" ref={this.chartRef} />
    )
  }
}
