import { render, screen } from '@testing-library/react'
import * as React from 'react'

import { WebsocketContext, WebsocketProvider } from './websocketProvider'

test('WebsocketProvider provide default context value', () => {
  const ConsumerComponent = () => {
    return <WebsocketContext.Consumer>{(value) => <span>Received: {JSON.stringify(value)}</span>}</WebsocketContext.Consumer>
  }
  const { container } = render(
    <WebsocketProvider>
      <ConsumerComponent />
    </WebsocketProvider>,
  )
  expect(container).toBeTruthy()
  expect(screen.getByText(/^Received:/).textContent).toBe(`Received: ${JSON.stringify({ readyState: false, io: null })}`)
})
