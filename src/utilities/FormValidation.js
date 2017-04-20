const FormValidation = (key, formVal) => {
  switch(key) {
    case 'weight':
    case 'age':
    case 'height':
    case 'reps':
      return parseFloat(formVal) <= 0;
    case 'calories':
      return ((parseFloat(formVal) <= 0) || (formVal === ''));
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
