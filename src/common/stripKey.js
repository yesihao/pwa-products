export default function stripKey(prefix) {
  return function transform(types) {
    return Object.keys(types)
      .filter(x => x.indexOf(prefix) === 0)
      .reduce((ret, x) => {
        const transformed = x.substring(prefix.length).split('_').map((y, idx) => {
          return idx === 0 ?
            y.toLowerCase()
            :
            y[0].toUpperCase() + y.substring(1).toLowerCase()
        }).join('')
        ret[transformed] = types[x]

        return ret
      }, {})
  }
}
