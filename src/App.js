import React, { Component } from 'react';
import './App.css';
import {UnitSelection, SexSelection} from './components/toggles';
import SingleInput from './components/input-fields/SingleInput';
import HeightInput from './components/input-fields/HeightInput';
import UnitLabel from './components/input-fields/UnitLabel';
import FieldError from './components/input-fields/FieldError';
import ActivitySelect from './components/input-fields/ActivitySelect';
import UnitConversion from './utilities/UnitConversion';
import DisplayOutput from './components/display-output/DisplayOutput';
import CalorieCalc from './utilities/CalorieCalc';
import FormValidation from './utilities/FormValidation'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      units: "",
      sex: "",
      displayWeight: "",
      masterWeight: "",
      age: "",
      feet: "",
      inches: "",
      activityLevel: "",
      masterHeight: "",
      bmr: "",
      tdee: "",
      errors: {
        units: false,
        sex: false,
        weight: false,
        age: false,
        height: false,
        activityLevel: false
      }
    }
  }
  handleUnitChange = (event) => {
    // cm to feet and inches
    if (this.state.units === 'metric' && this.state.masterHeight) {
      const totalInches = parseFloat(this.state.masterHeight) * 0.393701
      const feet = Math.floor(totalInches/12)
      const inches = Math.round(((totalInches % 12) * 10) / 10)
      this.setState({inches: inches})
      this.setState({feet: feet})
    }
    // kg to lb
    if (this.state.units === 'metric' && this.state.displayWeight) {
      const lbConversion = parseFloat(this.state.displayWeight) * 2.20462;
      this.setState({displayWeight: Math.round(lbConversion * 10) / 10});
    // lb to kg
    } else if (this.state.units === 'imperial' && this.state.displayWeight) {
      const kgConversion = parseFloat(this.state.displayWeight) * 0.453592;
      this.setState({displayWeight: Math.round(kgConversion * 10) / 10});
    }
    this.setState({units: event.target.value})
  }
  handleSexChange = (event) => {
    this.setState({sex: event.target.value})
  }
  handleWeightChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({displayWeight: event.target.value}, () => {
      if (this.state.units === 'imperial') {
        this.setState({masterWeight: UnitConversion.lbToKg(this.state.displayWeight)})
      } else {
        this.setState({masterWeight: this.state.displayWeight})
      }
    })
  }
  handleAgeChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({age: event.target.value})
  }
  handleCmChange = (event) => {
    this.setState({masterHeight: event.target.value})
  }
  handleFeetChange = (event) => {
    this.setState({feet: event.target.value}, function afterFeetChange () {
      this.setState({masterHeight: UnitConversion.imperialToCm(this.state.inches, this.state.feet)})
    });
  }
  handleInchesChange = (event) => {
    this.setState({inches: event.target.value}, function afterInchesChange () {
      this.setState({masterHeight: UnitConversion.imperialToCm(this.state.inches, this.state.feet)})
    });
  }
  handleActivityLevelChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({activityLevel: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const bmr = CalorieCalc.MifflinStJeor(this.state.sex, this.state.masterWeight, this.state.masterHeight, this.state.age, this.state.activityLevel)
    this.setState({bmr: bmr, tdee: Math.round(bmr * this.state.activityLevel)})
  }
  canBeSubmitted = () => {
    const { units, sex, masterWeight, age, activityLevel, masterHeight} = this.state
      return (
        units !== '' && sex !== '' && parseFloat(masterWeight) > 0 && parseFloat(age) > 0 && activityLevel !== '' && parseFloat(masterHeight) > 0
      )
  }
  handleErrors = (event) => {
    const hasError = FormValidation(event.target.name, event.target.value) || (event.target.value === '')
    this.setState({
      errors: { ...this.state.errors, [event.target.name]: hasError }
    })
  }
  handleImperialHeightErrors = (event) => {
    if (this.state.masterHeight > 0) {
      this.setState({
        errors: {...this.state.errors, 'height': false}
      })
    } else {
      this.setState({
        errors: {...this.state.errors, 'height': true}
      })
    }
  }
  render() {
    return (
      <div className="container-960">
        <div className="row">
          <div className="col-sm-6">
            <form className="form-horizontal clearfix bottom-buffer" onSubmit={this.handleSubmit}>
              <UnitSelection handleUnitChange={this.handleUnitChange} />
              <SexSelection handleSexChange={this.handleSexChange} />
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
              <HeightInput
                name='height'
                cm={this.state.masterHeight}
                feet={this.state.feet}
                inches={this.state.inches}
                hasErrors={this.state.errors.height}
                units={this.state.units}
                handleErrors={this.handleErrors}
                handleImperialHeightErrors={this.handleImperialHeightErrors}
                handleFeetChange={this.handleFeetChange}
                handleInchesChange={this.handleInchesChange}
                handleCmChange={this.handleCmChange}>
                <FieldError hasErrors={this.state.errors.height}
                  errorMsg='Height must be greater than 0' />
              </HeightInput>
              <ActivitySelect
                name='activityLevel'
                handleErrors={this.handleErrors}
                handleActivityLevelChange={this.handleActivityLevelChange}
                hasErrors={this.state.errors.activityLevel}>
                <FieldError hasErrors={this.state.errors.activityLevel}
                  errorMsg='Please select an activity level' />
              </ActivitySelect>
              <div className="pull-right">
                <button type="submit" disabled={!this.canBeSubmitted()} className="btn btn-default">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <DisplayOutput bmr={this.state.bmr} tdee={this.state.tdee}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
