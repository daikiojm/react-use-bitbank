# react-use-bitbank

React hooks to easily integrate [bitbank.cc](http://app.bitbank.cc/) public data into your React application.

## Getting Started

```bash
npm install react-use-bitbank
```

```tsx
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
```

```tsx
import { useTicker } from 'react-use-bitbank'

const MyComponent = () => {
  const pair = 'btc_jpy'
  const ticker = useTicker(pair)

  return (
    <div>
      <p>last: {ticker?.last}</p>
      <p>vol: {ticker?.vol}</p>
    </div>
  )
}
```

## Hooks

- useTicker
- useDepth
- useTransactions

## Documentation

https://github.com/bitbankinc/bitbank-api-docs
