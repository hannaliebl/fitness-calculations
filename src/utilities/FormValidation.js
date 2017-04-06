const FormValidation = (key, formVal) => {
  switch(key) {
    case 'weight':
    case 'age':
      return parseFloat(formVal) <= 0;
    default:
      return false;
  }
}

export default FormValidation
