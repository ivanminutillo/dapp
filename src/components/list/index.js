import React, {useContext} from 'react'
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {ProposalsContext} from '../../contexts/proposalsContext'

export const List = () => {
  const {proposals} = useContext(ProposalsContext)   
  return (
    <div className="max-w-screen-lg mx-auto -mt-16">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <div className="flex items-center h-16 px-4 text-base font-semibold text-gray-800 border-b">Most recent proposals</div>
        {proposals ?
          <ul className="divide-y divide-gray-200">
            {proposals.map(p => (
              <li key={p.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex-1 min-w-0 space-x-8 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-base">
                          <p className="text-gray-700 truncate">{p.title}</p>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {p.description}
                        </div>
                        <div className="flex mt-2 space-x-4">
                          {p.status == "Pending" ?  
                          <div className="text-sm font-medium text-yellow-500 uppercase">
                            {p.status}
                          </div> : 
                          <div className="text-sm font-medium text-green-500 uppercase">
                            {p.status}
                          </div> 
                          }
                          <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                              Closing on <strong>{p.endBlock}</strong> block
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                        <div className="flex flex-col">
                          <span className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">Votes</span>
                          <div className="flex space-x-2">
                            <div className="flex items-center px-3 py-2 space-x-2 text-sm font-medium uppercase bg-green-500 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-white">{p.forCount}</span>
                            </div>
                            <div className="flex items-center px-3 py-2 space-x-2 text-sm font-medium uppercase bg-red-500 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span className="text-white">{p.againstCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-5">
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul> :
          <div className="flex flex-col items-center my-6 space-y-2 text-gray-500 place-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Fetching the blockchain...</span>
          </div>}
      </div>
    </div>
  )
}
