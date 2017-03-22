const UnitConversion = {
  lbToKg (lbStr) {
    const lbConversion = parseFloat(lbStr) * 0.453592;
    return Math.round(lbConversion * 10) / 10;
  },
  imperialToCm (inches, feet) {
    const cmFromInches = parseFloat(inches) * 2.54;
    const cmFromFeet = parseFloat(feet) * 30.48;
    if (cmFromInches && cmFromFeet) {
      return Math.round((cmFromFeet + cmFromInches) * 10) / 10;
    } else if (cmFromInches) {
      return Math.round(cmFromInches * 10) / 10;
    } else {
      return Math.round(cmFromFeet * 10) / 10;
    }
  }
}

export default UnitConversion
