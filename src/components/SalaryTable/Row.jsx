import React from 'react';

export default class Row extends React.Component {
  salary() {
    if (this.props.salary.length == 1) {
      return this.props.salary[0];
    }

    return <span className="text-danger">{this.props.salary.join(' ')}</span>
  }

  render() {
    return (
      <tr>
        <td className="col-md-2">{this.props.rid}</td>
        <td className="col-md-1">{this.props.age}</td>
        <td className="col-md-2">{this.props.city}</td>
        <td className="col-md-3">{this.props.school}</td>
        <td className="col-md-2">{this.props.job}</td>
        <td className="col-md-1">{this.props.year}</td>
        <td className="col-md-1">{this.salary()}</td>
      </tr>
    )
  }
}
