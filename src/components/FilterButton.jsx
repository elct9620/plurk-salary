import React from 'react';

export default class FilterButton extends React.Component {
  sortStatusLabel() {
    switch (this.props.current) {
      case 'asc':
        return <i className="fas fa-sort-down"></i>;
      case 'desc':
        return <i className="fas fa-sort-up"></i>;
      default:
        return <i className="fas fa-sort"></i>;
    }
  }

  render() {
    return (
      <a onClick={this.props.onClick}>
        {this.props.children}
        &nbsp;
        {this.sortStatusLabel()}
      </a>
    )
  }
}
