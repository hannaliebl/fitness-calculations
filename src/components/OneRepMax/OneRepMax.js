import React, { Component } from 'react'

class OneRepMax extends Component {
  constructor(props) {
    super()
    this.state = {
      units: "",
      reps: "",
      max: "",
      errors: {
        units: false,
        reps: false,
      }
    }
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

        </div>
    );
  }
}

export default OneRepMax
