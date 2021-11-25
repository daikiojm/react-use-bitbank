import { act, renderHook } from '@testing-library/react-hooks'
import * as React from 'react'
import socketIOClient from 'socket.io-client'
import MockedSocket from 'socket.io-mock'

jest.mock('socket.io-client')

import { useWebsocket } from './useWebsocket'
import { WebsocketProvider } from './websocketProvider'

const mockServerEndpoint = 'ws://localhost:1234'

test('useWebsocket return default value', async () => {
  const socket = new MockedSocket()
  ;(socketIOClient as unknown as jest.Mock).mockReturnValue(socket)

  const wrapper = ({ children }) => <WebsocketProvider>{children}</WebsocketProvider>
  const { result } = renderHook(() => useWebsocket(), { wrapper })
  expect(result.error).toBe(undefined)
  expect(result.current.readyState).toBe(false)
})

test('useWebsocket return ready state when socket connected', async () => {
  const socket = new MockedSocket()
  ;(socketIOClient as unknown as jest.Mock).mockReturnValue(socket)

  const wrapper = ({ children }) => <WebsocketProvider publicWsEndpoint={mockServerEndpoint}>{children}</WebsocketProvider>
  const { result } = renderHook(() => useWebsocket(), { wrapper })
  act(() => {
    socket.socketClient.emit('connect')
  })
  expect(result.error).toBe(undefined)
  expect(result.current.readyState).toBe(true)
})
