const CalorieCalc = {
  MifflinStJeor (sex, weight, height, age) {
    if (sex === 'female') {
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
    } else if (sex === 'male') {
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
    } else {
      const m = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
      const f = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
      return (f + m)/2;
    }
  }
}

export default CalorieCalc
