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
      height: {
        view: "",
        value: ""
      },
      age: "",
      activityLevel: ""
    }
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleSexChange = this.handleSexChange.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleActivityLevelChange = this.handleActivityLevelChange.bind(this)
    this.handleHeightChange = this.handleHeightChange.bind(this)
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
  handleHeightChange (event) {
    if (this.state.units === 'metric') {
      let height = {
        view: event.target.value,
        value: event.target.value
      }
      this.setState({height: height})
    } else {
      this.setState({height: event.target.value})
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
          content={this.state.height}
          units={this.state.units}
          controlFunc={this.handleHeightChange}/>
      </form>
    );
  }
}

export default TdeeForm
