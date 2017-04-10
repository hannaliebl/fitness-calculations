import React from 'react';

export const SexSelection = (props) => (
  <div className="form-group">
    <label className="col-sm-2 control-label">
      Sex
    </label>
    <div className="col-sm-10">
      <label className="radio-inline">
        <input type="radio"
          name="sex"
          id="female"
          onChange={props.handleSexChange}
          value="female" /> Female
      </label>
      <label className="radio-inline">
        <input type="radio"
          name="sex"
          id="male"
          onChange={props.handleSexChange}
          value="male" /> Male
      </label>
      <label className="radio-inline">
        <input type="radio"
          name="sex"
          id="male"
          onChange={props.handleSexChange}
          value="neither" /> Don't care–average the results
      </label>
    </div>
  </div>
)
