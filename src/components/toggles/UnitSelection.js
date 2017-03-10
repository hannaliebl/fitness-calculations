import React from 'react';

export const UnitSelection = (props) => (
  <div>
    <label>Select units:</label>
    <input type="radio"
      name="unit"
      id="imperial"
      onChange={props.handleUnitChange}
      value="imperial" />
    <label htmlFor="imperial">Imperial</label>
    <input type="radio"
      name="unit"
      id="metric"
      onChange={props.handleUnitChange}
      value="metric" />
    <label htmlFor="metric">Metric</label>
  </div>
)
