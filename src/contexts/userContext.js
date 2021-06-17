import React, {useState, useEffect} from 'react'
import { useEagerConnect, useInactiveListener } from '../hooks/connect'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'


const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337],
});

let UserContext;

const {Provider, Consumer} = UserContext = React.createContext()

const UserProvider = (props) => {
  const web3 = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = web3
  const [balance, setBalance] = React.useState()
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds


  const [activatingConnector, setActivatingConnector] = React.useState()
  const [activateError, setActivateError] = useState('')

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const handleConnect = () => {
    try {
      web3.activate(injected, undefined, true);
    } catch (error) {
      setActivateError('')
      console.error(error);
    }
  };
  return (
    <Provider
        value={{
          account: account,
          activateError: activateError,
          balance: balance,
          handleConnect: handleConnect,
          deactivate: deactivate
        }}
      >
      {props.children}
    </Provider>
  )
} 


function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

export {UserProvider, Consumer as UserConsumer, UserContext};