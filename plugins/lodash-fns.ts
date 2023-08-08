export function groupByUsingMap<Y, T>(items: T[], iteratee: (item: T) => Y): Map<Y, T[]> {
  return items.reduce((map, item) => {
    const key = iteratee(item)
    const list = map.get(key) || []

    list.push(item)
    map.set(key, list)

    return map
  }, new Map<Y, T[]>())
}

export function collectByUsingMap<Y, T>(items: T[], iteratee: (item: T) => Y): Map<Y, T> {
  return items.reduce((map, item) => {
    const key = iteratee(item)
    map.set(key, item)
    return map
  }, new Map<Y, T>())
}
