import React, { Component } from 'react'
import SingleInput from '../input-fields/SingleInput'
import FieldError from '../input-fields/FieldError'
import DisplayOutput from '../display-output/DisplayOutput'
import HeartRateTable from '../HeartRateTable/HeartRateTable'
import FormValidation from '../../utilities/FormValidation'
import MaxHeartRate from '../../utilities/MaxHeartRate'

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
      </div>
    )
  }
}

export default TargetHeartRate
