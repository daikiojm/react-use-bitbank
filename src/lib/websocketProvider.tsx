import React, { useState, useEffect, useRef, createContext } from 'react'
import * as io from 'socket.io-client'

import { PUBLIC_WS_ENDPOINT, SOCKET_IO_DEFAULT_OPTIONS } from './constants'

export type MessagePayload<T = any> = {
  room_name: string
  message: { pid: number; data: T }
}

type WebsocketContextType = {
  io: SocketIOClient.Socket | null
  readyState: boolean
}

type OptionsProps = {
  publicWsEndpoint?: string
  socketIoOptions?: SocketIOClient.ConnectOpts
}

const websocketContextDefaultValue: WebsocketContextType = {
  io: null,
  readyState: false,
}

export const WebsocketContext = createContext<WebsocketContextType>(websocketContextDefaultValue)

export const WebsocketProvider: React.FC<OptionsProps> = ({
  children,
  publicWsEndpoint = PUBLIC_WS_ENDPOINT,
  socketIoOptions = SOCKET_IO_DEFAULT_OPTIONS,
}) => {
  const ioRef = useRef<SocketIOClient.Socket>()
  const [readyState, setReadyState] = useState<boolean>(false)

  useEffect(() => {
    const client = io(publicWsEndpoint, socketIoOptions)

    ioRef.current = client
    bindOpenHandler(ioRef.current)
    bindErrorHandler(ioRef.current)

    return () => {
      ioRef.current?.close()
    }
  }, [])

  const ctxValue: WebsocketContextType = {
    readyState,
    io: ioRef.current || null,
  }

  const bindOpenHandler = (io: SocketIOClient.Socket) => {
    io.on('connect', () => {
      setReadyState(true)
    })
  }

  const bindErrorHandler = (io: SocketIOClient.Socket) => {
    io.on('connect_error', (error: Error) => {
      console.error(error)
    })
    io.on('error', (error: Error) => console.error(error))
  }

  return <WebsocketContext.Provider value={ctxValue}>{children}</WebsocketContext.Provider>
}
