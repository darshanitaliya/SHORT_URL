const sessionIdToUserMap = new Map()

exports.setUser = (id, user) => {
  sessionIdToUserMap.set(id, user)
}

exports.getUser = (id) => {
  return sessionIdToUserMap.get(id)
}
