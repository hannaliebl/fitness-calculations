import React from 'react';
import partial from '../../utilities/partial'


const SingleInput = (props) => {
  const handleErrors = partial(props.handleErrors, props.keyName)
  return (
    <div className={`form-group ${props.errors ? 'has-error' : ''}`}>
      <label className="col-sm-2 control-label">{props.label}</label>
      <div className="col-sm-10">
        <input type={props.inputType}
          className="form-control"
          value={props.content}
          onChange={props.controlFunc}
          onBlur={handleErrors}
          style={{width: props.width, display: 'inline-block'}}/> <span>{props.units === 'imperial' && 'lb'}{props.units === 'metric' && 'kg'}</span>
      </div>
    </div>
  )
};

export default SingleInput
