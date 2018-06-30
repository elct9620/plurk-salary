import React from 'react';

export default (props) => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={props.progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{width: `${props.progress}%`}}
      />
    </div>
    )
}
