function PercentsValid (c, p, f) {
  if (isNaN(c)) {
    c = 0
  }
  if (isNaN(p)) {
    p = 0
  }
  if (isNaN(f)) {
    f = 0
  }
  if (c + p + f === 100 && c >= 0 && p >=0 && f >= 0) {
    return true
  } else {
    return false
  }
}

export default PercentsValid
