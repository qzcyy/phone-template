
export function getHashQuery(query) {
  if (location.hash.indexOf(query) > -1) {
    const cur = location.hash.slice(location.hash.indexOf(query) + query.length + 1, location.hash.length)
    if (cur.indexOf('&') > -1) {
      return cur.slice(0, cur.indexOf('&'))
    } else {
      return cur
    }
  } else {
    return false
  }
}
