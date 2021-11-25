import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { WebsocketProvider } from './websocketProvider'
import { useTicker } from './useTicker'

test('useTicker return default value', () => {
  const wrapper: React.FC = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useTicker('btc_jpy'), { wrapper })
  expect(result.current).toBe(undefined)
})
