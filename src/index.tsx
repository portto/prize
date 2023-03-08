import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import * as fcl from '@onflow/fcl'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import theme from './theme'

const isMainnet = process.env.REACT_APP_NETWORK === 'mainnet'
const NODE_URL = isMainnet ? 'https://rest-mainnet.onflow.org' : 'https://rest-testnet.onflow.org'
const WALLET_URL = isMainnet
  ? `https://wallet-v2.blocto.app/${process.env.REACT_APP_DAPP_ID}/flow/authn`
  : `https://wallet-v2-dev.blocto.app/${process.env.REACT_APP_DAPP_ID}/flow/authn`

fcl
  .config()
  .put('challenge.scope', 'email') // request for Email
  .put('accessNode.api', NODE_URL)
  .put('discovery.wallet', WALLET_URL) // Blocto testnet wallet
  .put('service.OpenID.scopes', 'email!')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
