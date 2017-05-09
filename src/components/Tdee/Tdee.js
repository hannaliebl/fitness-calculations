import React, { Component } from 'react';
import { UnitSelection, SexSelection } from '../toggles';
import SingleInput from '../input-fields/SingleInput';
import HeightInput from '../input-fields/HeightInput';
import UnitLabel from '../input-fields/UnitLabel';
import FieldError from '../input-fields/FieldError';
import ActivitySelect from '../input-fields/ActivitySelect';
import UnitConversion from '../../utilities/UnitConversion';
import DisplayOutput from '../display-output/DisplayOutput';
import CalorieCalc from '../../utilities/CalorieCalc';
import FormValidation from '../../utilities/FormValidation'
import Ad from '../Ad/Ad';
import myFitnessPalImg from '../../img/MyFitnessPal_Logo.png'
import scaleImg from '../../img/aa-scale.jpg'
import digitalScaleImg from '../../img/aa-digital-scale.jpg'
import fitbitImg from '../../img/aa-fitbit-charge.png'

class Tdee extends Component {
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
          <h1>TDEE Calculator</h1>
          <p className="lead">Use our calculator to find out how many calories your body burns every day (your TDEE, or Total Daily Energy Expenditure).
            It takes your individual body metrics and activity level and uses a <a href="https://www.ncbi.nlm.nih.gov/pubmed/2305711">scientifically
            accurate</a> formula to get your personalized result.
          </p>
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
          <div className="row">
            <div className="col-sm-12">
              <h2>Next Steps</h2>
              <p>If you are looking to gain or lose weight, you need to know that a pound of fat is about 3,500 calories. Most people are going to want to lose
              or gain that weight sustainably, at a rate of about 1 lb a week. That works out to 500 calories a day (500 x 7 = 3500). So take your TDEE and subtract
              500 from it to lose weight and add 500 to gain weight.
              </p>
              <p>Everyone is different, though, so it's also important that once you have your estimate TDEE to track what you are eating and your weight. If you are losing or
              gaining or staying the same, you will want to know how much you have eaten and adjust accordingly. To help you with keeping track of what you are eating and your
              weight, we've listed some essential tools below.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h2>Essential tools for gaining or losing weight:</h2>
            </div>
          </div>
          <div className="row">
            <Ad link="https://www.amazon.com/Ozeri-Digital-Multifunction-Kitchen-Elegant/dp/B004164SRA//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=ffb81d6d1131129a0c549e812596a1f5"
              image={scaleImg} title="Kitchen Scale"
              alt="A kitchen scale" >
              Losing or gaining weight requires knowing how much you are eating. This <a href="https://www.amazon.com/Ozeri-Digital-Multifunction-Kitchen-Elegant/dp/B004164SRA//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=ffb81d6d1131129a0c549e812596a1f5">bestselling digital kitchen scale</a> makes knowing that a breeze.
            </Ad>
            <Ad link="https://www.amazon.com/Etekcity-Digital-Bathroom-Technology-Elegant/dp/B00F3J9G1W//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=9ea94b3f68e824dfd9f031c8bd0d00c8"
              image={digitalScaleImg}
              title="Digital Scale"
              alt="A digital scale" >
              To keep track of whether you are gaining, losing, or maintaining your weight, you need a scale! <a href="https://www.amazon.com/Etekcity-Digital-Bathroom-Technology-Elegant/dp/B00F3J9G1W//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=9ea94b3f68e824dfd9f031c8bd0d00c8">This one</a> is highly-reviewed and accurate.
            </Ad>
          </div>
          <div className="row">
            <Ad link="//myfitnesspal.com"
              image={myFitnessPalImg}
              title="MyFitnessPal App"
              alt="MyFitnessPal log" >
              This <a href="//myfitnesspal.com">app and website</a> has a huge amount of nutrition information for foods. Once you know how much you need to eat, MyFitnessPal will help
              you track it.
            </Ad>
            <Ad link="https://www.amazon.com/Fitbit-Charge-Heart-Fitness-Wristband/dp/B01K9S260E/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=createahomegy-20&linkId=100ee607b4ea3abe14d81c6659db54e1"
              image={fitbitImg}
              title="Fitbit Charge 2 Fitness Tracker"
              alt="Fitbit Charge 2 fitness tracker" >
              If you want a more high-tech way to get your TDEE, invest in a fitness tracker. <a href="https://www.amazon.com/Fitbit-Charge-Heart-Fitness-Wristband/dp/B01K9S260E/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=createahomegy-20&linkId=100ee607b4ea3abe14d81c6659db54e1">FitBit</a>, with its constant heart rate monitoring, provides a decent
              estimate of your daily calories burned.
            </Ad>
          </div>
        </div>
    );
  }
}

export default Tdee;
