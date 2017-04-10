import React from 'react';

const UnitLabel = (props) => {
  return (
    <span>{props.units === 'imperial' && ' lb'}{props.units === 'metric' && ' kg'}</span>
  )
}

export default UnitLabel
