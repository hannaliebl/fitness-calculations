import React from 'react';

function HeightInput(props) {
  return (
    <div className="form-group">
      <label className="col-sm-2 control-label">Height</label>

      {(props.units === 'metric' || props.units === '') &&
      <div className="col-sm-10">
        <input type="number"
          className="form-control"
          value={props.content.masterHeight}
          onChange={props.controlFunc}
          style={{width: '80px', display: 'inline-block'}} />
          {props.units === 'metric' && <span> cm</span>}
        </div>
      }
      {props.units === 'imperial' &&
        <div className="col-sm-10">
          <input type="number"
            className="form-control"
            value={props.content.feet}
            onChange={props.controlFuncFeet}
            style={{width: '60px', display: 'inline-block'}} />
          {props.units === 'imperial' && <span> ft </span>}
          <input type="number"
            className="form-control"
            value={props.content.inches}
            onChange={props.controlFuncInches}
            style={{width: '60px', display: 'inline-block'}} />
          {props.units === 'imperial' && <span> in</span>}
          </div>
      }
    </div>
  )
}

export default HeightInput
