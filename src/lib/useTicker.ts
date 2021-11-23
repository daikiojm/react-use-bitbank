import { useEffect, useState } from 'react'

import { Pair } from './types'
import { getWsRoom } from './util'
import { useWebsocket } from './useWebsocket'

type WebsocketTickerResponse = {
  last: string
  open: string
  timestamp: number
  sell: string
  buy: string
  vol: string
  high: string
  low: string
}

export type Ticker = WebsocketTickerResponse

export type UseTicker = Ticker | undefined

export function useTicker(pair: Pair): UseTicker {
  const [ticker, setTicker] = useState<WebsocketTickerResponse>()
  const { lastMessage, joinRoom, leaveRoom, readyState } = useWebsocket<WebsocketTickerResponse>()

  useEffect(() => {
    if (!readyState) {
      return
    }

    const room = getWsRoom('TICKER', pair)
    joinRoom(room)

    return () => {
      setTicker(undefined)
      leaveRoom(room)
    }
  }, [pair, readyState])

  useEffect(() => {
    if (lastMessage !== null) {
      const room = getWsRoom('TICKER', pair)

      if (lastMessage.room_name === room && lastMessage.message && lastMessage.message.data) {
        const newTicker = lastMessage.message.data
        setTicker(newTicker)
      }
    }
  }, [lastMessage])

  return ticker
}
