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
      weight: "",
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
    this.setState({units: event.target.value})
  }
  handleSexChange (event) {
    this.setState({sex: event.target.value})
  }
  handleWeightChange (event) {
    this.setState({weight: event.target.value})
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
  imperialToCm () {
    const cmFromInches = parseInt(this.state.inches, 10) * 2.54;
    const cmFromFeet = parseInt(this.state.feet, 10) * 30.48;
    if (cmFromInches && cmFromFeet) {
      return cmFromFeet + cmFromInches;
    } else if (cmFromInches) {
      return cmFromInches
    } else {
      return cmFromFeet
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
          content={this.state.weight}
          width={'80px'}
          controlFunc={this.handleWeightChange}/>
        <SingleInput
          label={'Age'}
          inputType={'number'}
          content={this.state.age}
          width={'80px'}
          controlFunc={this.handleAgeChange}/>
        <HeightInput
          content={this.state.feet}
          units={this.state.units}
          controlFuncFeet={this.handleFeetChange}
          controlFuncInches={this.handleInchesChange}
          controlFunc={this.handleCmChange}/>
      </form>
    );
  }
}

export default TdeeForm
