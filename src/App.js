import React from 'react'
import {Home} from './pages/home'
import { Web3ReactProvider } from '@web3-react/core'
import {getLibrary} from './utils/getLibrary'

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
}

export default App;
