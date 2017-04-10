import React from 'react';

function ActivitySelect(props) {
  return (
    <div className="form-group">
      <label className="col-sm-2 control-label">Activity Level</label>
      <div className="col-sm-10">
        <select className="form-control" onChange={props.handleActivityLevelChange}>
          <option value="">Select an activity level</option>
          <option value="1.2">Little to no exercise</option>
          <option value="1.375">Light exercise, 1-3 days per week</option>
          <option value="1.55">Moderate exercise, 3-5 days per week</option>
          <option value="1.75">Heavy exercise, 6-7 days per week</option>
          <option value="1.9">Very heavy exercise, twice a day every day</option>
      </select>
      <span className="help-block">Tip: Most people tend to overestimate their activity level.</span>
      </div>
    </div>
  )
}

export default ActivitySelect
