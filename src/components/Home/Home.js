import React from 'react'
import './Home.css';
import oneRepMaxImg from '../../img/one-rep-max.jpg'
import oneRepMaxSvg from '../../img/one-rep-max.svg'
import macrosImg from '../../img/macros.jpg'
import macrosSvg from '../../img/macros.svg'
import tdeeImg from '../../img/tdee.jpg'
import tdeeSvg from '../../img/tdee.svg'
import programPickerImg from '../../img/program-picker.jpg'
import programPickerSvg from '../../img/program-picker.svg'

function Home(props) {
  return (
    <div className="container-960">
      <h1>Fitness Calculations</h1>
      <p className="lead">
      Sometimes a little bit of math can help you achieve your goals! This site aims to simplify
      some common calculations you might need to know in your fitness journey.
      </p>
      <div className="row">
        <div className="col-sm-6">
          <a href="/tdee-calculator">
            <div className="intro-block-img" style={{backgroundImage: `url(${tdeeImg})`}}>
              <div className="intro-block mod-tdee">
                <h1>TDEE</h1>
                <img src={tdeeSvg} className="intro-block-icon" alt="An icon of a show" />
                <h2>A calculator to find your Total Daily Energy Expenditure, or how many calories you
                burn in a day, based on your own body metrics and activity level. This is useful for people
                looking to gain or lose weight.</h2>
              </div>
            </div>
          </a>
        </div>
        <div className="col-sm-6">
          <a href="/one-rep-max-calculator">
            <div className="intro-block-img" style={{backgroundImage: `url(${oneRepMaxImg})`}}>
              <div className="intro-block mod-max">
                <h1>One Rep Max</h1>
                <img src={oneRepMaxSvg} className="intro-block-icon" alt="An icon of a bicep curling a dumbbell" />
                <h2>A calculator to find your one-rep weightlifting max. This is useful for people who
                can't safely test their one-rep max and need that value to measure their progress or to follow
                a specific weightlifting program.</h2>
              </div>
            </div>
          </a>
        </div>
        <div className="col-sm-6">
          <a href="/macros-calculator">
            <div className="intro-block-img" style={{backgroundImage: `url(${macrosImg})`}}>
              <div className="intro-block mod-macros">
                <h1>Macros</h1>
                <img src={macrosSvg} className="intro-block-icon" alt="An icon of a plate, knife, and fork" />
                <h2>A calculator that takes your total calorie needs and the percentages of each macronutrient you
                want and gives you their value in grams.</h2>
              </div>
            </div>
          </a>
        </div>
        <div className="col-sm-6">
          <a href="/program-picker">
            <div className="intro-block-img" style={{backgroundImage: `url(${programPickerImg})`}}>
              <div className="intro-block mod-program-picker">
                <h1>Program Picker</h1>
                <img src={programPickerSvg} className="intro-block-icon" alt="An icon of a barbell" />
                <h2>A set of questions to help you find a weightlifting program that fits your goals, with links to
                resources on the program that it finds for you.</h2>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
