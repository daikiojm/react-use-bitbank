# react-use-bitbank


![npm](https://img.shields.io/npm/v/react-use-bitbank) [![github pages](https://github.com/daikiojm/react-use-bitbank/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/daikiojm/react-use-bitbank/actions/workflows/gh-pages.yml)

React hooks to easily integrate [bitbank.cc](http://app.bitbank.cc/) public data into your React application.

**[demo]**

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

## Example

You can check it in the demo application [code](https://github.com/daikiojm/react-use-bitbank/tree/main/examples/demo).

## Documentation

https://github.com/bitbankinc/bitbank-api-docs

[demo]: https://daikiojm.github.io/react-use-bitbank/
