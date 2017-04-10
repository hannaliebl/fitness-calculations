import React from 'react';

const SingleInput = (props) => {
  return (
    <div className={`form-group ${props.hasErrors ? 'has-error' : ''}`}>
      <label className="col-sm-2 control-label">{props.label}</label>
      <div className="col-sm-10">
        <input type={props.inputType}
          className="form-control"
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleErrors}
          style={{width: props.width, display: 'inline-block'}}/>
          {props.children}
      </div>
    </div>
  )
};

export default SingleInput
