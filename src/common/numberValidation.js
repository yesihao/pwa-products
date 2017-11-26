export const checkCcyAmt = str => {
  return /^[0-9]+(\.[0-9]{0,2})?$|^$/.test(str)
}

export const checkInt = str => {
  return /^[0-9]*$/.test(str)
}
