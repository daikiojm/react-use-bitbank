import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { useTransactions } from './useTransactions'
import { WebsocketProvider } from './websocketProvider'

test('useTransactions return default value', () => {
  const wrapper: React.FC = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useTransactions('btc_jpy'), { wrapper })
  expect(result.error).toBe(undefined)
  expect(result.current).toStrictEqual([])
})

test('useTransactions work with custom url', () => {
  const wrapper: React.FC = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useTransactions('btc_jpy', 'http://localhost:1234'), { wrapper })
  expect(result.error).toBe(undefined)
})

test('useTransactions work with custom length', () => {
  const wrapper: React.FC = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useTransactions('btc_jpy', undefined, 20), { wrapper })
  expect(result.error).toBe(undefined)
})

test('useTransactions throw error when invalid length', () => {
  const wrapper: React.FC = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useTransactions('btc_jpy', undefined, 2000), { wrapper })
  expect(result.error).toEqual(new Error('Transaction size must be less than or equal to 100'))
})
