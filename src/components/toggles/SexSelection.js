import React from 'react';

export const SexSelection = (props) => (
  <div>
    <label>Sex:</label>
    <input type="radio"
      name="sex"
      id="male"
      onChange={props.handleSexChange}
      value="male" />
    <label htmlFor="male">Male</label>
    <input type="radio"
      name="sex"
      id="female"
      onChange={props.handleSexChange}
      value="female" />
    <label htmlFor="female">Female</label>
  </div>
)
