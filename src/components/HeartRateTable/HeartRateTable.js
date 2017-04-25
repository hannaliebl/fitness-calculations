import React from 'react'
import './HeartRateTable.css'

function HeartRateTable(props) {
  return (
    <div>
      {props.hrMax && <h4>Target Heart Ranges:</h4>}
      {props.hrMax && !props.rhr &&
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>% of Max</th>
              <th>Description</th>
              <th>Heart Rate Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>85% - 95%</td>
              <td>Vigorous exercise–anaerobic training, like during high intensity interval training (sprint workouts)</td>
              <td>{Math.round(props.hrMax * 0.85)} - {Math.round(props.hrMax * 0.95)}</td>
            </tr>
            <tr>
              <td>65% - 85%</td>
              <td>Moderate exercise–ideal for training aerobic capacity. Going for a longer run or bike ride, for example.</td>
              <td>{Math.round(props.hrMax * 0.65)} - {Math.round(props.hrMax * 0.85)}</td>
            </tr>
            <tr>
              <td>55% - 65%</td>
              <td>Light exercise–like going for a walk.</td>
              <td>{Math.round(props.hrMax * 0.55)} - {Math.round(props.hrMax * 0.65)}</td>
            </tr>
          </tbody>
        </table>
      }
      {props.hrMax && props.rhr &&
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>% of Max</th>
              <th>Description</th>
              <th>Heart Rate Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>85% - 95%</td>
              <td>Vigorous exercise–anaerobic training, like during high intensity interval training (sprint workouts)</td>
              <td>{Math.round(((props.hrMax - props.rhr) * 0.85) + +props.rhr)} - {Math.round(((props.hrMax - props.rhr) * 0.95) + +props.rhr)}</td>
            </tr>
            <tr>
              <td>65%</td>
              <td>Moderate exercise–ideal for training aerobic capacity. Going for a longer run or bike ride, for example.</td>
              <td>{Math.round(((props.hrMax - props.rhr) * 0.65) + +props.rhr)} - {Math.round(((props.hrMax - props.rhr) * 0.85) + +props.rhr)}</td>
            </tr>
            <tr>
              <td>55% - 65%</td>
              <td>Light exercise–like going for a walk.</td>
              <td>{Math.round(((props.hrMax - props.rhr) * 0.55) + +props.rhr)} - {Math.round(((props.hrMax - props.rhr) * 0.65) + +props.rhr)}</td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  )
}

export default HeartRateTable
