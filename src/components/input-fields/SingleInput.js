import React from 'react';

const SingleInput = (props) => (
  <div className="form-group">
    <label className="col-sm-2 control-label">{props.label}</label>
    <div className="col-sm-10">
      <input type={props.inputType}
        className="form-control"
        value={props.content}
        onChange={props.controlFunc}
        style={{width: props.width, display: 'inline-block'}}/> <span>{props.units === 'imperial' && 'lb'}{props.units === 'metric' && 'kg'}</span>
    </div>
  </div>
);

export default SingleInput
