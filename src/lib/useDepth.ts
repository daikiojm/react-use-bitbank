import { useEffect, useMemo, useState } from 'react'
import { useWebsocket } from './useWebsocket'

import { Pair } from './types'
import { getWsRoom } from './util'
import { DEPTH_DEFAULT_LENGTH, DEPTH_PRICE_INDEX, DEPTH_AMOUNT_INDEX, DEPTH_MAX_LENGTH } from './constants'

type Price = string
type Amount = string
export type Depth = [Price, Amount]

export type DepthWhole = {
  bids: Depth[]
  asks: Depth[]
  timestamp: number
}

export type DepthDiff = {
  b: Depth[]
  a: Depth[]
  t: number
}

export type UseDepth = Omit<DepthWhole, 'timestamp'>

export function useDepth(pair: Pair, size = DEPTH_DEFAULT_LENGTH): UseDepth {
  const [asksMap, setAsks] = useState<Map<string, string>>(new Map())
  const [bidsMap, setBids] = useState<Map<string, string>>(new Map())
  const [updatedTimestamp, setUpdatedTimestamp] = useState<number>(0)

  // price asc
  const asks = useMemo(() => [...asksMap.entries()].sort((a, b) => +a[DEPTH_PRICE_INDEX] - +b[DEPTH_PRICE_INDEX]).slice(0, size), [asksMap])
  // price desc
  const bids = useMemo(() => [...bidsMap.entries()].sort((a, b) => +b[DEPTH_PRICE_INDEX] - +a[DEPTH_PRICE_INDEX]).slice(0, size), [bidsMap])

  const { lastMessage, joinRoom, leaveRoom, readyState } = useWebsocket<DepthWhole | DepthDiff>()

  useEffect(() => {
    if (size > DEPTH_MAX_LENGTH) {
      throw new Error(`Depth size must be less than or equal to ${DEPTH_MAX_LENGTH}`)
    }

    const wholeRoom = getWsRoom('DEPTH_WHOLE', pair)
    const diffRoom = getWsRoom('DEPTH_DIFF', pair)

    const start = async () => {
      if (!readyState) {
        return
      }

      joinRoom(wholeRoom)
      joinRoom(diffRoom)
    }
    start()

    return () => {
      if (!readyState) {
        return
      }

      setBids(new Map())
      setAsks(new Map())
      leaveRoom(wholeRoom)
      leaveRoom(diffRoom)
    }
  }, [pair, readyState])

  useEffect(() => {
    if (lastMessage !== null) {
      const wholeRoom = getWsRoom('DEPTH_WHOLE', pair)
      const diffRoom = getWsRoom('DEPTH_DIFF', pair)

      if (lastMessage.room_name === wholeRoom) {
        const { asks, bids, timestamp } = lastMessage.message.data as DepthWhole

        setUpdatedTimestamp(timestamp)
        setAsks(new Map<string, string>(asks))
        setBids(new Map<string, string>(bids))
      }

      if (lastMessage.room_name === diffRoom) {
        const { a, b, t } = lastMessage.message.data as DepthDiff
        if (updatedTimestamp >= t) {
          return
        }

        for (const item of a) {
          const price = item[DEPTH_PRICE_INDEX]
          const amount = item[DEPTH_AMOUNT_INDEX]

          if (amount === '0') {
            setAsks((prev) => {
              prev.delete(price)
              return new Map(prev)
            })
          } else {
            setAsks((prev) => {
              return new Map(prev.set(price, amount))
            })
          }
        }

        for (const item of b) {
          const price = item[DEPTH_PRICE_INDEX]
          const amount = item[DEPTH_AMOUNT_INDEX]

          if (amount === '0') {
            setBids((prev) => {
              prev.delete(price)
              return new Map(prev)
            })
          } else {
            setBids((prev) => {
              return new Map(prev.set(price, amount))
            })
          }
        }
      }
    }
  }, [lastMessage])

  return {
    asks,
    bids,
  }
}
