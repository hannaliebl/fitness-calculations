import React, { Component } from 'react';

export default class Weight extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div>
        <label>Weight:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.handleChange}/> {this.props.units === 'imperial' && 'lb'}{this.props.units === 'metric' && 'kg'}
      </div>
    );
  }
}
