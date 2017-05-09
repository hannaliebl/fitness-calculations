import React, { Component } from 'react'
import SingleInput from '../input-fields/SingleInput'
import FieldError from '../input-fields/FieldError'
import DisplayOutput from '../display-output/DisplayOutput'
import HeartRateTable from '../HeartRateTable/HeartRateTable'
import FormValidation from '../../utilities/FormValidation'
import MaxHeartRate from '../../utilities/MaxHeartRate'
import Ad from '../Ad/Ad';
import chestStrapImg from '../../img/aa-chest-strap-heartrate.jpg'
import fitbitImg from '../../img/aa-fitbit-charge.png'


class TargetHeartRate extends Component {
  constructor(props) {
    super()
    this.state = {
      age: "",
      rhr: "",
      hrMax: "",
      errors: {
        age: false,
        rhr: false
      }
    }
  }
  handleAgeChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({age: event.target.value})
  }
  handleRhrChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({rhr: event.target.value})
  }
  handleErrors = (event) => {
    const hasError = FormValidation(event.target.name, event.target.value)
    this.setState({
      errors: { ...this.state.errors, [event.target.name]: hasError }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const hrMax = MaxHeartRate(this.state.age)
    this.setState({hrMax: hrMax})
  }
  canBeSubmitted = () => {
    const { age, rhr } = this.state
    return (
      age !== '' && parseFloat(age) > 0 && (rhr > 0 || rhr === '')
    )
  }
  render() {
    return (
      <div className="container-960">
        <h1>Target Heart Rate</h1>
        <p className="lead">This calculator will find your recommended maximum heart rate
        and then use that to find different heart ranges for different exercise intensities
        and workout goals.
        </p>
        <p className="lead">If you know your resting heart rate you can optionally enter it to
        get more accurate results, but even if you don't know it, the calculator should be able
        to give you a reasonable estimate.</p>
        <div className="row">
          <div className="col-sm-6">
            <form className="form-horizontal clearfix bottom-buffer" onSubmit={this.handleSubmit}>
              <SingleInput
                label='Age'
                inputType='number'
                name='age'
                hasErrors={this.state.errors.age}
                value={this.state.age}
                width='80px'
                handleChange={this.handleAgeChange}
                handleErrors={this.handleErrors}>
                <FieldError hasErrors={this.state.errors.age}
                  errorMsg='Age must be greater than 0' />
              </SingleInput>
              <SingleInput
                label='Resting HR'
                inputType='number'
                name='rhr'
                hasErrors={this.state.errors.rhr}
                value={this.state.rhr}
                width='80px'
                handleChange={this.handleRhrChange}
                handleErrors={this.handleErrors}> bpm
                <span className="help-block"><em>Optional</em></span>
                <FieldError hasErrors={this.state.errors.rhr}
                  errorMsg='Resting heart rate must be greater than 0.' />
              </SingleInput>
              <div className="pull-right">
                <button type="submit" disabled={!this.canBeSubmitted()} className="btn btn-default">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <DisplayOutput hrMax={this.state.hrMax} rhr={this.state.rhr}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <HeartRateTable hrMax={this.state.hrMax} rhr={this.state.rhr} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h2>Essential tools for measuring your heart rate:</h2>
          </div>
        </div>
        <div className="row">
          <Ad link="https://www.amazon.com/Polar-Bluetooth-Fitness-Tracker-XX-Large/dp/B007S088F4//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=9447a2f4b7bf92a37260a74a7bb7dfeb"
            image={chestStrapImg}
            title="Chest Strap Monitor"
            alt="A chest strap heart rate monitor" >
            Chest strap heart rate monitors are the most accurate heart rate monitors around. If you are serious about doing target heart rate training, they are the equipment to buy. <a href="https://www.amazon.com/Polar-Bluetooth-Fitness-Tracker-XX-Large/dp/B007S088F4//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=9447a2f4b7bf92a37260a74a7bb7dfeb">Polar's H7 model</a> connects to a smart phone via Bluetooth to record its measurements.
          </Ad>
          <Ad link="https://www.amazon.com/Fitbit-Charge-Heart-Fitness-Wristband/dp/B01K9S260E/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=createahomegy-20&linkId=100ee607b4ea3abe14d81c6659db54e1"
            image={fitbitImg}
            title="Fitbit Charge 2 Fitness Tracker"
            alt="Fitbit Charge 2 fitness tracker" >
            <a href="https://www.amazon.com/Fitbit-Charge-Heart-Fitness-Wristband/dp/B01K9S260E/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=createahomegy-20&linkId=100ee607b4ea3abe14d81c6659db54e1">FitBit</a> trackers are wrist trackers that provide constant heart rate monitoring, amomg a variety of other features. They are not quite as accurate as chest monitors, but its other features may make it a better option for you.
          </Ad>
        </div>
      </div>
    )
  }
}

export default TargetHeartRate
