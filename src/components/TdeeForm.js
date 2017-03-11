import React, {Component} from 'react';
import {UnitSelection, SexSelection} from './toggles';
import Weight from './input-fields/Weight';

class TdeeForm extends Component {
  constructor() {
    super()
    this.state = {
      units: "",
      sex: "",
      weight: "",
      age: "",
      activityLevel: ""
    }
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleSexChange = this.handleSexChange.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleActivityLevelChange = this.handleActivityLevelChange.bind(this)
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
  handleActivityLevelChange (event) {
    this.setState({activityLevel: event.target.value})
  }
  render() {
    return (
      <form className="form-horizontal">
        <UnitSelection handleUnitChange={this.handleUnitChange} />
        <SexSelection handleSexChange={this.handleSexChange} />
        <Weight units={this.state.units} />
      </form>
    );
  }
}

export default TdeeForm
