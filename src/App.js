import React, { Component } from 'react';
import './App.css';
import {UnitSelection, SexSelection} from './components/toggles';
import SingleInput from './components/input-fields/SingleInput';
import HeightInput from './components/input-fields/HeightInput';
import ActivitySelect from './components/input-fields/ActivitySelect';
import UnitConversion from './utilities/UnitConversion';
import DisplayOutput from './components/display-output/DisplayOutput';
import CalorieCalc from './utilities/CalorieCalc';

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
      tdee: ""
    }
  }
  handleUnitChange = (event) => {
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
    this.setState({displayWeight: event.target.value}, () => {
      if (this.state.units === 'imperial') {
        this.setState({masterWeight: UnitConversion.lbToKg(this.state.displayWeight)})
      } else {
        this.setState({masterWeight: this.state.displayWeight})
      }
    })
  }
  handleAgeChange = (event) => {
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
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <UnitSelection handleUnitChange={this.handleUnitChange} />
              <SexSelection handleSexChange={this.handleSexChange} />
              <SingleInput
                label={'Weight'}
                inputType={'number'}
                units={this.state.units}
                content={this.state.displayWeight}
                width={'80px'}
                controlFunc={this.handleWeightChange}/>
              <SingleInput
                label={'Age'}
                inputType={'number'}
                content={this.state.age}
                width={'80px'}
                controlFunc={this.handleAgeChange}/>
              <HeightInput
                content={this.state.masterHeight}
                units={this.state.units}
                controlFuncFeet={this.handleFeetChange}
                controlFuncInches={this.handleInchesChange}
                controlFunc={this.handleCmChange}/>
              <ActivitySelect handleActivityLevelChange={this.handleActivityLevelChange} />
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
