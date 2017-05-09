import React, { Component } from 'react'
import { UnitSelection } from '../toggles'
import SingleInput from '../input-fields/SingleInput'
import UnitLabel from '../input-fields/UnitLabel'
import FieldError from '../input-fields/FieldError'
import DisplayOutput from '../display-output/DisplayOutput';
import FormValidation from '../../utilities/FormValidation'
import OneRepMaxCalc from '../../utilities/OneRepMaxCalc'
import Ad from '../Ad/Ad';
import chalkImg from '../../img/aa-gym-chalk.jpg'
import beltImg from '../../img/aa-weight-belt.jpg'

class OneRepMax extends Component {
  constructor(props) {
    super()
    this.state = {
      units: "",
      reps: "",
      weight: "",
      max: "",
      errors: {
        units: false,
        reps: false,
        weight: false
      }
    }
  }
  handleUnitChange = (event) => {
    this.setState({units: event.target.value})
  }
  handleWeightChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({weight: event.target.value})
  }
  handleRepsChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({reps: event.target.value})
  }
  handleErrors = (event) => {
    const hasError = FormValidation(event.target.name, event.target.value) || (event.target.value === '')
    this.setState({
      errors: { ...this.state.errors, [event.target.name]: hasError }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const max = OneRepMaxCalc(this.state.weight, this.state.reps)
    this.setState({max: max})
  }
  canBeSubmitted = () => {
    const { units, reps, weight} = this.state
      return (
        units !== '' && parseFloat(reps) > 0 && parseFloat(weight) > 0
      )
  }
  render() {
    return (
        <div className="container-960">
          <h1>One Rep Max Calculator</h1>
          <p className="lead">Your one rep max is the amount of weight you can lift once for a given exercise. This is
          a useful measure of strength, and some lifting programs calculate their weekly weight values based on your one
          rep max. You can go out and test your one rep max yourself, but this calculator will also give you a useful estimate
          of your current one rep max based on lower weights you can perform for more reps.
          </p>
          <p className="lead">
          The formula is most accurate for rep ranges up to 10. Find a weight you can do 5 to 10 times, enter it, and see your
          one rep max.
          </p>
          <div className="row">
            <div className="col-sm-6">
              <form className="form-horizontal clearfix bottom-buffer" onSubmit={this.handleSubmit}>
                <UnitSelection handleUnitChange={this.handleUnitChange} />
                <SingleInput
                  label='Weight'
                  inputType='number'
                  name='weight'
                  hasErrors={this.state.errors.weight}
                  value={this.state.displayWeight}
                  width='80px'
                  handleChange={this.handleWeightChange}
                  handleErrors={this.handleErrors}>
                  <UnitLabel units={this.state.units}/>
                  <FieldError hasErrors={this.state.errors.weight}
                    errorMsg='Weight must be greater than 0' />
                </SingleInput>
                <SingleInput
                  label='Reps'
                  inputType='number'
                  name='reps'
                  hasErrors={this.state.errors.reps}
                  value={this.state.reps}
                  width='80px'
                  handleChange={this.handleRepsChange}
                  handleErrors={this.handleErrors}>
                  <FieldError hasErrors={this.state.errors.reps}
                    errorMsg='Reps must be greater than 0' />
                </SingleInput>
                <div className="pull-right">
                  <button type="submit" disabled={!this.canBeSubmitted()} className="btn btn-default">Submit</button>
                </div>
              </form>
            </div>
            <div className="col-sm-6">
              <DisplayOutput max={this.state.max} units={this.state.units}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h2>Essential tools for lifting heavy:</h2>
            </div>
          </div>
          <div className="row">
            <Ad link="https://www.amazon.com/Refillable-Chalk-Ball-Capacity-Comes/dp/B0175OQJMG/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=bab37ba934fc878a918330338e4518d8"
              image={chalkImg}
              title="Gym Chalk"
              alt="Photograph of gym chalk" >
              Trying to approach your one-rep max on lifts like the deadlift is likely impossible without <a href="https://www.amazon.com/Refillable-Chalk-Ball-Capacity-Comes/dp/B0175OQJMG/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=bab37ba934fc878a918330338e4518d8">chalk</a>. Luckily
              it's cheap and easy to use!
            </Ad>
            <Ad link="https://www.amazon.com/Refillable-Chalk-Ball-Capacity-Comes/dp/B0175OQJMG/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=bab37ba934fc878a918330338e4518d8"
              image={beltImg}
              title="Valeo Weight Belt"
              alt="Photograph of black weight belt" >
              If you are moving serious weight, a belt like the <a href="https://www.amazon.com/Refillable-Chalk-Ball-Capacity-Comes/dp/B0175OQJMG/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=bab37ba934fc878a918330338e4518d8">Valeo</a> is important to keep your back safe, especially on full body compound
              barbell lifts like the squat and deadlift.
            </Ad>
          </div>
        </div>
    )
  }
}

export default OneRepMax
