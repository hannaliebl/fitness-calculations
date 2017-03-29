const CalorieCalc = {
  MifflinStJeor (sex, weight, height, age) {
    if (sex === 'female') {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
  }
}

export default CalorieCalc
