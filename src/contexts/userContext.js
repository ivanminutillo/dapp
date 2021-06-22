import React, {useState, useEffect} from 'react'
import { useEagerConnect, useInactiveListener } from '../hooks/connect'
import { useWeb3React } from '@web3-react/core'
import { Contract } from "@ethersproject/contracts";
import { formatEther } from '@ethersproject/units'
import {Addresses} from '../addresses'
import tokenABI from '../abis/Comp.json'
import {injected} from '../connectors'

let UserContext;

const {Provider, Consumer} = UserContext = React.createContext()

const UserProvider = (props) => {
  const [contract, setContract] = useState()
  const web3 = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, error } = web3
  
  useEffect(() => {
    if (!library || !account) return;
    const token = new Contract(Addresses.COMP, tokenABI.abi, library.getSigner(account));    
    setContract(token)
  }, [library, account]);


  const [balance, setBalance] = React.useState()
  React.useEffect(() => {
    if (!!account && !!library && !!contract) {
      let stale = false
      
      contract.balanceOf(account)
        .then((balance) => {
          console.log(formatEther(balance))
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
  }, [account, library, chainId, contract]) 

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
      activate(injected, undefined, true);
    } catch (error) {
      setActivateError(error)
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
          setActivateError: setActivateError,
          deactivate: deactivate,
          tokenContract: contract,
        }}
      >
      {props.children}
    </Provider>
  )
} 

export {UserProvider, Consumer as UserConsumer, UserContext};