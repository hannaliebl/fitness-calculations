import React from 'react';

function DisplayOutput(props) {
  return (
    <div>
      <h2>Basal Metabolic Rate: {props.bmr}</h2>
      <h2>Total Daily Energy Expenditure: {props.tdee}</h2>
    </div>
  )
}

export default DisplayOutput
