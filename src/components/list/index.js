import React, {useContext} from 'react'
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {ProposalsContext} from '../../contexts/proposalsContext'
import {useProposalCounts} from '../../hooks/proposals'

export const List = () => {
  const {proposals} = useContext(ProposalsContext) 
  const {addresses, response} = useProposalCounts()
  console.log(addresses)
  console.log(response) 
  return (
    <div className="max-w-screen-lg -mt-16 mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="font-semibold h-16 border-b px-4 items-center flex text-base text-gray-800">Most recent proposals</div>
        <ul className="divide-y divide-gray-200">
          {proposals.map(p => (
            <li key={p.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-base">
                        <p className="text-gray-700 truncate">{p.title}</p>
                      </div>
                      <div className="mt-1 text-gray-500 text-sm">
                      Bring governance proposals to life even if you don’t own any tokens
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>
                            Closing on <time dateTime={p.closeDate}>{p.closeDateFull}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex flex-col">
                        <div className="h-2 relative w-40 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gray-100 absolute"></div>
                            <div id="bar" style={{width: p.delegated}} className="h-full bg-green-500 relative"></div>
                        </div>
                        <div className="uppercase text-green-500 font-medium mt-1 text-sm">
                          <span className="">{p.delegated}</span> delegated
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
