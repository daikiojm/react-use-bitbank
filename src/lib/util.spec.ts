import { uniqueByKey, getWsRoom } from './util'

describe('utils', () => {
  test('uniqueByKey', () => {
    expect(uniqueByKey([{ a: '1' }, { a: '2' }], 'a')).toStrictEqual([{ a: '1' }, { a: '2' }])
    expect(uniqueByKey([{ a: '1' }, { a: '2' }, { a: '1' }], 'a')).toStrictEqual([{ a: '1' }, { a: '2' }])
  })

  test('getWsRoom', () => {
    expect(getWsRoom('TICKER', 'btc_jpy')).toBe('ticker_btc_jpy')
    expect(getWsRoom('TRANSACTIONS', 'btc_jpy')).toBe('transactions_btc_jpy')
    expect(getWsRoom('DEPTH_WHOLE', 'btc_jpy')).toBe('depth_whole_btc_jpy')
    expect(getWsRoom('DEPTH_DIFF', 'btc_jpy')).toBe('depth_diff_btc_jpy')
  })
})
