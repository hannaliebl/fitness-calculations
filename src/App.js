import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {UnitSelection, SexSelection} from './components/toggles';
import Weight from './components/input-fields/Weight';

class App extends Component {
  constructor() {
    super()
    this.state = {
      units: "",
      sex: ""
    }
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleSexChange = this.handleSexChange.bind(this)
  }
  handleUnitChange (event) {
    this.setState({
      units: event.target.value
    })
  }
  handleSexChange (event) {
    this.setState({
      sex: event.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <UnitSelection handleUnitChange={this.handleUnitChange} />
        <SexSelection handleSexChange={this.handleSexChange} />
        <Weight units={this.state.units}/>
      </div>
    );
  }
}

export default App;
