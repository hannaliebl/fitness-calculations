const FormValidation = (key, formVal) => {
  switch(key) {
    case 'weight':
    case 'height':
    case 'reps':
    case 'rhr':
      return parseFloat(formVal) <= 0;
    case 'calories':
    case 'age':
      return ((parseFloat(formVal) <= 0) || (formVal === ''))
    case 'carbsPercent':
    case 'proteinPercent':
    case 'fatPercent':
      if (formVal === '') {
        return false
      } else {
        return ((parseFloat(formVal) < 0) || (parseFloat(formVal) > 100))
      }
    default:
      return false;
  }
}

export default FormValidation
