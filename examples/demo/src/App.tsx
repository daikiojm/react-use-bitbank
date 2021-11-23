import { useTicker } from 'react-use-bitbank'

function App() {
  const ticker = useTicker('btc_jpy')

  return (
    <div>
      <p>last: {ticker?.last}</p>
      <p>vol: {ticker?.vol}</p>
    </div>
  )
}

export default App
