function OneRepMaxCalc (weight, reps) {
  return Math.round(weight * (36 / (37 - reps)))
}

export default OneRepMaxCalc
