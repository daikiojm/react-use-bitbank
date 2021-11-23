import { useEffect, useState } from 'react'

import { Pair } from './types'
import { uniqueByKey, getWsRoom } from './util'
import { useWebsocket } from './useWebsocket'
import { usePublicApi } from './usePublicApi'
import { TRANSACTION_DEFAULT_LENGTH, PUBLIC_API_BASE_URL, TRANSACTION_MAX_LENGTH } from './constants'

export type Transaction = {
  transaction_id: number
  side: string
  price: string
  amount: string
  executed_at: number
}

type WebsocketTransactionsResponse = {
  transactions: Transaction[]
}

export type UseTransactions = Transaction[]

export function useTransactions(pair: Pair, publicApiBaseUrl = PUBLIC_API_BASE_URL, size = TRANSACTION_DEFAULT_LENGTH): UseTransactions {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { fetchTransactions } = usePublicApi(publicApiBaseUrl)
  const { lastMessage, joinRoom, leaveRoom, readyState } = useWebsocket<WebsocketTransactionsResponse>()

  useEffect(() => {
    if (size > TRANSACTION_MAX_LENGTH) {
      throw new Error(`Transaction size must be less than or equal to ${TRANSACTION_MAX_LENGTH}`)
    }

    const room = getWsRoom('TRANSACTIONS', pair)

    const start = async () => {
      if (!readyState) {
        return
      }

      joinRoom(room)

      const firstTransuctions = await fetchTransactions(pair)
      setTransactions(firstTransuctions)
    }
    start()

    return () => {
      if (!readyState) {
        return
      }

      setTransactions([])
      leaveRoom(room)
    }
  }, [pair, readyState])

  useEffect(() => {
    if (lastMessage !== null) {
      const room = getWsRoom('TRANSACTIONS', pair)

      if (lastMessage.room_name === room && lastMessage.message && lastMessage.message.data) {
        const transactionsWs = lastMessage.message.data.transactions
        const newTransactions = uniqueByKey<Transaction>([...transactionsWs, ...transactions], 'transaction_id').slice(0, size)
        setTransactions(newTransactions)
      }
    }
  }, [lastMessage])

  return transactions
}
