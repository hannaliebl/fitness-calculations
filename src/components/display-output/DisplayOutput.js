import React from 'react';
import './DisplayOutput.css';

function DisplayOutput(props) {
  return (
    <div className="text-center">
    {props.tdee &&
      <div className="result-block">
        <h4>Total Daily Energy Expenditure:</h4>
        <h1> {props.tdee} {props.bmr && 'calories'}</h1>
        <p>The calories your body will burn in a day based on your activity level.</p>
      </div>
    }
    {props.bmr &&
      <div className="result-block mod-bmr">
        <h4>Basal Metabolic Rate:</h4>
        <h1>{props.bmr} {props.bmr && 'calories'}</h1>
        <p>Even without leaving bed, your body will burn this many calories in a day.</p>
      </div>
    }
    {props.max &&
      <div className="result-block mod-max">
        <h4>One Rep Max:</h4>
        <h1>{props.max} {props.units === 'imperial' && 'lb'} {props.units === 'metric' && 'kg'}</h1>
        <p>Your calculated one-rep max.</p>
      </div>
    }
    </div>
  )
}

export default DisplayOutput
