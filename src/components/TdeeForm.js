import React, {Component} from 'react';
import {UnitSelection, SexSelection} from './toggles';
import SingleInput from './input-fields/SingleInput';
import HeightInput from './input-fields/HeightInput';

class TdeeForm extends Component {
  constructor() {
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
      masterHeight: ""
    }
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleSexChange = this.handleSexChange.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleActivityLevelChange = this.handleActivityLevelChange.bind(this)
    this.handleCmChange = this.handleCmChange.bind(this)
    this.handleFeetChange = this.handleFeetChange.bind(this)
    this.handleInchesChange = this.handleInchesChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleUnitChange (event) {
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
  handleSexChange (event) {
    this.setState({sex: event.target.value})
  }
  handleWeightChange (event) {
    this.setState({displayWeight: event.target.value}, () => {
      if (this.state.units === 'imperial') {
        this.setState({masterWeight: this.lbToKg(this.state.displayWeight)})
      } else {
        this.setState({masterWeight: this.state.displayWeight})
      }
    })
  }
  handleAgeChange (event) {
    this.setState({age: event.target.value})
  }
  handleCmChange (event) {
    this.setState({masterHeight: event.target.value})
  }
  handleFeetChange (event) {
    this.setState({feet: event.target.value}, function afterFeetChange () {
      this.setState({masterHeight: this.imperialToCm()})
    });
  }
  handleInchesChange (event) {
    this.setState({inches: event.target.value}, function afterInchesChange () {
      this.setState({masterHeight: this.imperialToCm()})
    });
  }
  lbToKg (lbStr) {
    const lbConversion = parseFloat(lbStr) * 0.453592;
    return Math.round(lbConversion * 10) / 10;
  }
  imperialToCm () {
    const cmFromInches = parseFloat(this.state.inches) * 2.54;
    const cmFromFeet = parseFloat(this.state.feet) * 30.48;
    if (cmFromInches && cmFromFeet) {
      return cmFromFeet + cmFromInches;
    } else if (cmFromInches) {
      return cmFromInches;
    } else {
      return cmFromFeet;
    }
  }
  handleActivityLevelChange (event) {
    this.setState({activityLevel: event.target.value})
  }
  render() {
    return (
      <form className="form-horizontal">
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
      </form>
    );
  }
}

export default TdeeForm
