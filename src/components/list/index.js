import React, {useContext} from 'react'
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {ProposalsContext} from '../../contexts/proposalsContext'

export const List = () => {
  const {proposals} = useContext(ProposalsContext) 

  
  return (
    <div className="max-w-screen-lg mx-auto -mt-16">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <div className="flex items-center h-16 px-4 text-base font-semibold text-gray-800 border-b">Most recent proposals</div>
        <ul className="divide-y divide-gray-200">
          {proposals.map(p => (
            <li key={p.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-base">
                        <p className="text-gray-700 truncate">{p.title}</p>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                      Bring governance proposals to life even if you don’t own any tokens
                      </div>
                      <div className="flex mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>
                            Closing on <time dateTime={p.closeDate}>{p.closeDateFull}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                      <div className="flex flex-col">
                        <div className="relative w-40 h-2 overflow-hidden rounded-full">
                            <div className="absolute w-full h-full bg-gray-100"></div>
                            <div id="bar" style={{width: p.delegated}} className="relative h-full bg-green-500"></div>
                        </div>
                        <div className="mt-1 text-sm font-medium text-green-500 uppercase">
                          <span className="">{p.delegated}</span> delegated
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
        </ul>
      </div>
    </div>
  )
}
