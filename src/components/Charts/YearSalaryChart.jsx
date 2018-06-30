import React from 'react';
import Chart from 'chart.js';

import { SummaryToBubble } from '../../helper/Chart';

export default class YearSalaryChart extends React.Component {
  constructor(props) {
    super(props);

    this.chart = null;
    this.chartRef = React.createRef();
    this.summary = SummaryToBubble(this.props.items, 'year', 'salary');
  }

  componentDidMount() {
    this.chart = new Chart(
      this.chartRef.current,
      {
        type: 'bubble',
        data: {
          datasets: [{
            label: '年資 x 薪資',
            data: this.summary,
            backgroundColor: 'rgba(255, 99, 132, 0.9)'
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
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
      this.summary = SummaryToBubble(this.props.items, 'year', 'salary');
      return this.summary;
    }

    return null;
  }

  componentDidUpdate(props, state, snapshot) {
    this.chart.data.datasets[0].data = this.summary;
    this.chart.update();
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    )
  }
}
