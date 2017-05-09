import React, { Component } from 'react'
import SingleInput from '../input-fields/SingleInput'
import FieldError from '../input-fields/FieldError'
import DisplayOutput from '../display-output/DisplayOutput';
import FormValidation from '../../utilities/FormValidation'
import PercentsValid from '../../utilities/PercentsValid'
import CalorieCalc from '../../utilities/CalorieCalc';
import Ad from '../Ad/Ad';
import scaleImg from '../../img/aa-scale.jpg'
import wheyImg from '../../img/aa-whey.jpg'

class Macros extends Component {
  constructor(props) {
    super()
    this.state = {
      calories: "",
      proteinPercent: "",
      proteinGrams: "",
      carbsPercent: "",
      carbsGrams: "",
      fatPercent: "",
      fatGrams: "",
      totalPercentValid: false,
      errors: {
        calories: false,
        proteinPercent: false,
        carbsPercent: false,
        fatPercent: false,
      }
    }
  }
  handleCaloriesChange = (event) => {
    if (this.state.errors[event.target.name] === true) {
      this.handleErrors(event)
    }
    this.setState({calories: event.target.value})
  }
  handleMacroPercentageChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, function() {
      this.setState({totalPercentValid: PercentsValid(parseFloat(this.state.carbsPercent), parseFloat(this.state.proteinPercent), parseFloat(this.state.fatPercent))})
    })
  }
  handleErrors = (event) => {
    const hasError = FormValidation(event.target.name, event.target.value)
    this.setState({
      errors: { ...this.state.errors, [event.target.name]: hasError }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const result = CalorieCalc.PercentMacrosToGrams(parseFloat(this.state.calories), parseFloat(this.state.carbsPercent), parseFloat(this.state.proteinPercent), parseFloat(this.state.fatPercent))
    this.setState({
      carbsGrams: result.carbsGrams,
      proteinGrams: result.proteinGrams,
      fatGrams: result.fatGrams
    })
  }
  canBeSubmitted = () => {
    let toggle = false
    const errObjVals = Object.keys(this.state.errors).map(key => this.state.errors[key]);
    const errObjHasErr = errObjVals.find((val) => {return val})
    if (errObjHasErr == null) {
      toggle = true
    }
    return toggle && this.state.totalPercentValid
  }
  render() {
    return (
      <div className="container-960">
        <h1>Macronutrient Calculator</h1>
        <p className="lead">Macronutrients are the three groups all foods are divided into: carbohydrates,
        fats, and protein. Depending on your dietary needs, your macronutrient percentages could be very different
        while your calories stay the same. Someone on the <a href="https://www.amazon.com/Ketogenic-Cookbook-Nutritious-Low-Carb-High-Fat/dp/1628600780/ref=as_li_ss_tl?s=sporting-goods&ie=UTF8&qid=1494310956&sr=8-1&keywords=ketogenic&linkCode=ll1&tag=createahomegy-20&linkId=4e645b6e05d6699b64ce2b3402c46dd9">ketogenic diet</a>,
        for example, will have very high fat, moderate protein, and very low carbohydrate percentages, while someone
        following a diet like Renaissance Periodization could be eating the same amount of total calories but have low
        fat, high protein, and moderate carbohydrates.
        </p>
        <p className="lead">
        There are many different philosophies on what macronutrient percentages should look like, so his calulcator
        will let you set your own custom percentages.
        </p>
        <div className="row">
          <div className="col-sm-6">
            <form className="form-horizontal clearfix bottom-buffer" onSubmit={this.handleSubmit}>
              <h4>The total number of calories you want to eat daily:</h4>
              <SingleInput
                label='Calories'
                inputType='number'
                name='calories'
                hasErrors={this.state.errors.calories}
                value={this.state.calories}
                width='80px'
                handleChange={this.handleCaloriesChange}
                handleErrors={this.handleErrors}>
                <FieldError hasErrors={this.state.errors.calories}
                  errorMsg='Calories must be greater than 0' />
              </SingleInput>
              <h4>The macro percentages you want:</h4>
              <SingleInput
                label='Carbs'
                inputType='number'
                name='carbsPercent'
                hasErrors={this.state.errors.carbsPercent}
                value={this.state.carbsPercent}
                width='80px'
                handleChange={this.handleMacroPercentageChange}
                handleErrors={this.handleErrors}> %
                <FieldError hasErrors={this.state.errors.carbsPercent}
                  errorMsg='Percentage of carbohydrates must be 0 or greater and less than 101' />
              </SingleInput>
              <SingleInput
                label='Protein'
                inputType='number'
                name='proteinPercent'
                hasErrors={this.state.errors.proteinPercent}
                value={this.state.proteinPercent}
                width='80px'
                handleChange={this.handleMacroPercentageChange}
                handleErrors={this.handleErrors}> %
                <FieldError hasErrors={this.state.errors.proteinPercent}
                  errorMsg='Percentage of protein must be 0 or greater and less than 101' />
              </SingleInput>
              <SingleInput
                label='Fat'
                inputType='number'
                name='fatPercent'
                hasErrors={this.state.errors.fatPercent}
                value={this.state.fatPercent}
                width='80px'
                handleChange={this.handleMacroPercentageChange}
                handleErrors={this.handleErrors}> %
                <FieldError hasErrors={this.state.errors.fatPercent}
                  errorMsg='Percentage of fat must be 0 or greater and less than 101' />
              </SingleInput>
              <FieldError hasErrors={!this.state.totalPercentValid}
                errorMsg='All the percentages must equal 100' />
              <div className="pull-right">
                <button type="submit" disabled={!this.canBeSubmitted()} className="btn btn-default">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <DisplayOutput carbsGrams={this.state.carbsGrams} proteinGrams={this.state.proteinGrams} fatGrams={this.state.fatGrams}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h2>Essential tools for hitting your macros:</h2>
          </div>
        </div>
        <div className="row">
          <Ad link="https://www.amazon.com/Ozeri-Digital-Multifunction-Kitchen-Elegant/dp/B004164SRA//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=ffb81d6d1131129a0c549e812596a1f5"
            image={scaleImg}
            title="Kitchen Scale"
            alt="A kitchen scale" >
            You have to know how much you are eating to know whether or not you are meeting your macronutrient goals. This <a href="https://www.amazon.com/Ozeri-Digital-Multifunction-Kitchen-Elegant/dp/B004164SRA//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=createahomegy-20&linkId=ffb81d6d1131129a0c549e812596a1f5">bestselling digital kitchen scale</a> makes knowing how much you are eating easy.
          </Ad>
          <Ad link="https://www.amazon.com/Optimum-Nutrition-Standard-Protein-Chocolate/dp/B000QSNYGI/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=createahomegy-20&linkId=aaa952040d174b0d444179577b49cc67"
            image={wheyImg}
            title="Whey Protein"
            alt="Photo of Optimum Nutrition whey protein powder tub" >
            Especially if you are looking to gain muscle, protein requirements can be tough to meet. An easy way to get high-quality protein to meet your macro goals is to use whey protein. <a href="https://www.amazon.com/Optimum-Nutrition-Standard-Protein-Chocolate/dp/B000QSNYGI/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=createahomegy-20&linkId=aaa952040d174b0d444179577b49cc67">Optimum Nutrition's whey</a> is always a good bet.
          </Ad>
        </div>
      </div>
    )
  }
}

export default Macros
