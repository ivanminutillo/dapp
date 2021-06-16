import React, {useState, useEffect} from 'react'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers, shortenAddress } from '@usedapp/core'
import {Danger} from '../alerts/danger'
import {Tokens} from '../../addresses/tokens'

export const Header = () => {
  const { account, activateBrowserWallet } = useEthers()
  const userBalance = useEtherBalance(Tokens.COMP, account)
  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])
  
  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }

  return (
    <div>
    {activateError && <Danger message={activateError} cancel={setActivateError} /> }
    <div className="flex items-center h-16">
      <div className="flex-1 flex space-x-4 items-baseline">
        <div className="text-gray-200 font-bold text-lg">crowdpound</div>
      </div>
      {account ? (
      <div className="flex space-x-4">
        <button type="button" className="inline-flex items-center px-4 py-2 border border-green-400 text-sm font-medium text-green-400 hover:bg-green-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Create a proposal
        </button>
        <div className="flex space-x-2">
          <div className="rounded bg-gray-600 p-1 flex items-center">
            {userBalance && <div className="rounded bg-gray-700 text-gray-300 flex-grow p-1.5 text-sm font-semibold">{formatEther(userBalance)} COMP</div>}
            <div className="text-gray-200 font-medium px-2 text-base">{shortenAddress(account)}</div>
            <div className="w-5 h-5 ml-1 mr-2 rounded-full bg-gray-300"></div>
          </div>
          <div className="rounded bg-gray-600 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
      </div>
      ) : 
      ( <button type="button" onClick={activate} className="inline-flex items-center px-4 py-2 border border-green-400 text-sm font-medium text-green-400 hover:bg-green-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"> Connect </button>)   }
    </div>
  </div>
  )
}