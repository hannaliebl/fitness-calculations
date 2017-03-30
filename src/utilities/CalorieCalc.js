const CalorieCalc = {
  MifflinStJeor (sex, weight, height, age) {
    if (sex === 'female') {
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
    } else {
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
    }
  }
}

export default CalorieCalc
