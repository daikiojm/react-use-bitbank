import { WS_ROOMS } from './constants'
import { Pair } from './types'

export function uniqueByKey<T>(array: T[], key: keyof T): T[] {
  return [...new Map(array.map((t) => [t[key], t])).values()]
}

export function getWsRoom(type: keyof typeof WS_ROOMS, pair: Pair) {
  return `${WS_ROOMS[type]}_${pair}`
}
