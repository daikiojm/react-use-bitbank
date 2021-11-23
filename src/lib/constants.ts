export const PUBLIC_API_BASE_URL = 'https://public.bitbank.cc'
export const PUBLIC_WS_ENDPOINT = 'wss://stream.bitbank.cc'

export const SOCKET_IO_DEFAULT_OPTIONS: SocketIOClient.ConnectOpts = {
  reconnection: true,
  timeout: 5 * 1000,
  transports: ['websocket'],
}

export const BASE_CURRENCIES = ['btc', 'jpy'] as const
export const QUOTE_CURRENCIES = ['btc', 'xrp', 'ltc', 'eth', 'mona', 'bcc', 'xlm', 'qtum', 'bat', 'omg', 'xym'] as const

export const PUBLIC_API_PATHS = {
  TICKER: 'ticker',
  TRANSACTIONS: 'transactions',
  DEPTH: 'depth',
} as const

export const WS_ROOMS = {
  TICKER: 'ticker',
  TRANSACTIONS: 'transactions',
  DEPTH_WHOLE: 'depth_whole',
  DEPTH_DIFF: 'depth_diff',
} as const

export const TRANSACTION_DEFAULT_LENGTH = 50
export const TRANSACTION_MAX_LENGTH = 100

export const DEPTH_DEFAULT_LENGTH = 30
export const DEPTH_MAX_LENGTH = 200

export const DEPTH_PRICE_INDEX = 0
export const DEPTH_AMOUNT_INDEX = 1
