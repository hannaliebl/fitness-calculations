const CalorieCalc = {
  MifflinStJeor (sex, weight, height, age) {
    if (sex === 'female') {
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161)
    } else if (sex === 'male') {
      return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
    } else {
      const m = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
      const f = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161)
      return (f + m)/2
    }
  },
  PercentMacrosToGrams (totalCal, c, p, f) {
    if (isNaN(c)) {
      c = 0
    }
    if (isNaN(p)) {
      p = 0
    }
    if (isNaN(f)) {
      f = 0
    }
    const carbsGrams = Math.round(((totalCal * (c * 0.01)) / 4) * 10) / 10
    const proteinGrams = Math.round(((totalCal * (p * 0.01)) / 4) * 10) / 10
    const fatGrams = Math.round(((totalCal * (f * 0.01)) / 9) * 10) / 10
    return { carbsGrams, proteinGrams, fatGrams }
  }
}

export default CalorieCalc
