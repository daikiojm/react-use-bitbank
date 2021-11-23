import React from 'react'
import ReactDOM from 'react-dom'
import { WebsocketProvider } from 'react-use-bitbank'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <WebsocketProvider>
      <App />
    </WebsocketProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
