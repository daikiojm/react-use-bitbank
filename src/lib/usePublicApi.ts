import { Pair } from './types'
import { PUBLIC_API_BASE_URL, PUBLIC_API_PATHS } from './constants'

type ErrorResponse = {
  success: 0
  data: {
    code: number
  }
}

type SuccessResponse<T> = {
  success: 1
  data: T
}

export type Response<T> = ErrorResponse | SuccessResponse<T>

export type Transaction = {
  transaction_id: number
  side: string
  price: string
  amount: string
  executed_at: number
}

type Price = number
type Amount = number
type Depth = {
  asks: [Price, Amount][]
  bids: [Price, Amount][]
  timestamp: number
  sequenceId: string
}

const publicApiFetch = async <D>(url: RequestInfo | string): Promise<D> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`http error: ${response.statusText}`)
  }

  const json = await response.json()

  if (!json.success) {
    throw new Error(`api error: ${json.data.code}`)
  }

  return json.data
}

export function usePublicApi(publicApiBaseUrl: string = PUBLIC_API_BASE_URL) {
  const fetchTransactions = async (pair: Pair): Promise<Transaction[]> => {
    const url = new URL([pair, PUBLIC_API_PATHS.TRANSACTIONS].join('/'), publicApiBaseUrl)
    const { transactions } = await publicApiFetch<{
      transactions: Transaction[]
    }>(url.toString())
    return transactions
  }

  const fetchDepth = async (pair: Pair): Promise<Depth> => {
    const url = new URL([pair, PUBLIC_API_PATHS.DEPTH].join('/'), publicApiBaseUrl)
    const depth = await publicApiFetch<Depth>(url.toString())
    return depth
  }

  return {
    fetchTransactions,
    fetchDepth,
  }
}
