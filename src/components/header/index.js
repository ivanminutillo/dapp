import React, {useContext} from 'react'

import { UserContext } from '../../contexts/userContext';
import { formatEther } from '@ethersproject/units'
import {Danger} from '../alerts/danger'
import GovABI from '../../abis/Governor.json'
import TokenABI from '../../abis/Comp.json'
import {Addresses} from '../../addresses'
import { useContract } from '../../hooks/contract';
import {encodeParameters} from '../../utils'


async function delegate(contract) {
  try {    
    const tx = await contract.delegate("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    console.log(tx)
    alert(`Successfully delegated`);
  } catch (error) {
    console.error(error);
  } 
}



async function propose(contract) {
  try {
    const tx = await contract.propose(["0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"], ["0"], ["transfer(address, uint256)"], [encodeParameters(['address'], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"])], "# Proposal title\n The idealized vision of decentralized coordination triggered by the invention of blockchain continues to attract entrepreneurial and general interest. But while cryptonetwork innovators are obviously onto something unique and interesting, these emerging social systems are far from immune to problems that have plagued human institutions historically.")
    console.log(tx)
    alert(`Successfully proposed`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  } 
  
}


export const Header = () => {
  const contract = useContract(Addresses.GOVERNOR, GovABI.abi, true)
  const tokenContract = useContract(Addresses.COMP, TokenABI.abi, true)

  const {activateError, setActivateError, account, balance, handleConnect} = useContext(UserContext)
  return (
    <div>
    {activateError && <Danger message={activateError} cancel={setActivateError} /> }
    <div className="flex items-center h-16">
      <div className="flex items-baseline flex-1 space-x-4">
        <div className="text-lg font-bold text-gray-200">Governor example</div>
      </div>
      {account ? (
      <div className="flex space-x-4">
        <button type="button" onClick={() => delegate(tokenContract)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-400 border border-green-400 hover:bg-green-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Delegate
        </button>
        <button type="button" onClick={() => propose(contract)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-400 border border-green-400 hover:bg-green-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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