const partial = (fn, ...args) => {
  return fn.bind(null, ...args)
}

export default partial
