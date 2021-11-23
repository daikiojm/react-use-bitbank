import { useState, useCallback, useEffect, useContext } from 'react'

import { WebsocketContext, MessagePayload } from './websocketProvider'

type UseWebsocket<T = any> = {
  lastMessage: MessagePayload<T> | null
  joinRoom: (room: any) => void
  leaveRoom: (room: any) => void
  readyState: boolean
}

export function useWebsocket<T>(): UseWebsocket<T> {
  const [lastMessage, setLastMessage] = useState<MessagePayload | null>(null)
  const { io, readyState } = useContext(WebsocketContext)

  useEffect(() => {
    if (io !== null) {
      io.on('message', (message: MessagePayload) => {
        setLastMessage(message)
      })
    }

    return () => {
      setLastMessage(null)
    }
  }, [io])

  const joinRoom = useCallback(
    (room: string) => {
      if (!io) {
        throw new Error('Socket.io client not initialized.')
      }

      io.emit('join-room', room)
    },
    [io],
  )

  const leaveRoom = useCallback(
    (room: string) => {
      if (!io) {
        throw new Error('Socket.io client not initialized.')
      }

      io.emit('leave-room', room)
    },
    [io],
  )

  return { lastMessage, joinRoom, leaveRoom, readyState }
}
