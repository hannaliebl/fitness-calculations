import React from 'react';

function HeightInput(props) {
  return (
    <div className={`form-group ${props.hasErrors ? 'has-error' : ''}`}>
      <label className="col-sm-2 control-label">Height</label>
      {(props.units === 'metric' || props.units === '') &&
      <div className="col-sm-10">
        <input type="number"
          name={props.name}
          className="form-control"
          value={props.value.masterHeight}
          onChange={props.handleCmChange}
          onBlur={props.handleErrors}
          style={{width: '80px', display: 'inline-block'}} />
          {props.units === 'metric' && <span> cm</span>}
          {props.children}
        </div>
      }
      {props.units === 'imperial' &&
        <div className="col-sm-10">
          <input type="number"
            name={props.name}
            className="form-control"
            value={props.value.feet}
            onChange={props.handleFeetChange}
            onBlur={props.handleImperialHeightErrors}
            style={{width: '60px', display: 'inline-block'}} />
          <span> ft </span>
          <input type="number"
            name={props.name}
            className="form-control"
            value={props.value.inches}
            onChange={props.handleInchesChange}
            onBlur={props.handleImperialHeightErrors}
            style={{width: '60px', display: 'inline-block'}} />
          <span> in</span>
          {props.children}
          </div>
      }
    </div>
  )
}

export default HeightInput
