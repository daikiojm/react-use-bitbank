import { renderHook } from '@testing-library/react-hooks'
import * as React from 'react'

import { WebsocketProvider } from './websocketProvider'
import { useDepth } from './useDepth'

test('useDepth return default value', async () => {
  const wrapper = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useDepth('btc_jpy'), { wrapper })
  expect(result.error).toBe(undefined)
  expect(result.current.asks).toStrictEqual([])
  expect(result.current.bids).toStrictEqual([])
})

test('useDepth work with depth length', async () => {
  const wrapper = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useDepth('btc_jpy', 20), { wrapper })
  expect(result.error).toBe(undefined)
})

test('useDepth throw error when invalid depth length', async () => {
  const wrapper = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useDepth('btc_jpy', 2000), { wrapper })
  expect(result.error).toEqual(new Error('Depth size must be less than or equal to 200'))
})
