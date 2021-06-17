import React, {useContext} from 'react'
import { UserContext } from '../../contexts/userContext';
import { formatEther } from '@ethersproject/units'
import {Danger} from '../alerts/danger'


export const Header = () => {
  const {activateError, setActivateError, account, balance, handleConnect} = useContext(UserContext)

  return (
    <div>
    {activateError && <Danger message={activateError} cancel={setActivateError} /> }
    <div className="flex items-center h-16">
      <div className="flex items-baseline flex-1 space-x-4">
        <div className="text-lg font-bold text-gray-200">crowdpound</div>
      </div>
      {account ? (
      <div className="flex space-x-4">
        <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-400 border border-green-400 hover:bg-green-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Create a proposal
        </button>
        <div className="flex space-x-2">
          <div className="flex items-center p-1 bg-gray-600 rounded">
            {balance && <div className="rounded bg-gray-700 text-gray-300 flex-grow p-1.5 text-sm font-semibold">{formatEther(balance)} COMP</div>}
            <div className="px-2 text-base font-medium text-gray-200">{account.substring(0, 6)}...{account.substring(account.length - 4)}</div>
            <div className="w-5 h-5 ml-1 mr-2 bg-gray-300 rounded-full"></div>
          </div>
          <div className="p-2 bg-gray-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
      </div>
      ) : 
      ( <button type="button" onClick={handleConnect} className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-400 border border-green-400 hover:bg-green-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"> Connect </button>)   }
    </div>
  </div>
  )
}