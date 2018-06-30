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
        <td>{this.props.rid}</td>
        <td>{this.props.age}</td>
        <td>{this.props.city}</td>
        <td>{this.props.school}</td>
        <td>{this.props.job}</td>
        <td>{this.props.year}</td>
        <td>{this.salary()}</td>
      </tr>
    )
  }
}
