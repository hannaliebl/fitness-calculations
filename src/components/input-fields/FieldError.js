import React from 'react';
import './FieldError.css';

const FieldError = (props) => {
  return (
    <span>
    {props.hasErrors && <span className="help-block">{props.errorMsg}</span>}
    </span>
  )
}

export default FieldError
