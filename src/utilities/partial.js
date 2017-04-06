const partial = (fn, ...args) => {
  // debugger
  return fn.bind(null, ...args)
}

export default partial
