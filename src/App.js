import {Home} from './pages/home'
import { ChainId, DAppProvider } from '@usedapp/core'

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

function App() {
  return (
    <DAppProvider config={config}>
      <Home />
    </DAppProvider>
  );
}

export default App;
