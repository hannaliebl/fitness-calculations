import React from 'react';

export const UnitSelection = (props) => (
  <div className="form-group">
    <label className="col-sm-2 control-label">
      Units
    </label>
    <div className="col-sm-10">
      <label className="radio-inline">
        <input type="radio"
          name="unit"
          id="imperial"
          onChange={props.handleUnitChange}
          value="imperial" /> Imperial
      </label>
      <label className="radio-inline">
        <input type="radio"
          name="unit"
          id="metric"
          onChange={props.handleUnitChange}
          value="metric" /> Metric
      </label>
    </div>
  </div>
)
