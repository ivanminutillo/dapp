import React, {useMemo, useEffect, useState} from 'react'
import { useContract } from '../hooks/contract';
import { utils } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import {Addresses} from '../addresses'
import governorABI from '../abis/Governor.json'


function enumerateProposalState(state)  {
  const proposalStates = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
  return proposalStates[state];
};

async function getProposals(contract, formattedEvents) {
  const proposalCount = await contract.proposalCount();
    const proposalGets = [];
    const proposalStateGets = [];
    for (const i of Array.from(Array(parseInt(proposalCount)),(n,i) => i+1)) {
      proposalGets.push(contract.proposals(i));
      proposalStateGets.push(contract.state(i));
    }
    const proposals = await Promise.all(proposalGets);
    const proposalStates = await Promise.all(proposalStateGets);

    proposals.reverse();
    proposalStates.reverse();

    return proposals
    .map((p, i) => {
      const description = formattedEvents[i].description
      const formattedProposal = {
        id: proposals[i].id.toString(),
        title: description.split(/# |\n/g)[1] || 'Untitled',
        description: description || 'No description.',
        proposer: proposals[i].proposer,
        status: enumerateProposalState(proposalStates[i]),
        forCount: parseFloat(utils.formatUnits(proposals[i].forVotes.toString(), 18)),
        againstCount: parseFloat(utils.formatUnits(proposals[i].againstVotes.toString(), 18)),
        startBlock: parseInt(proposals[i].startBlock?.toString()),
        endBlock: parseInt(proposals[i].endBlock?.toString()),
        details: formattedEvents[i].details,
      }
      return formattedProposal
    })
}

const eventParser = new utils.Interface(governorABI.abi)

let ProposalsContext;

const {Provider, Consumer} = ProposalsContext = React.createContext()

const ProposalsProvider = (props) => {
  const web3 = useWeb3React()
  const { library} = web3
  const contract = useContract(Addresses.GOVERNOR, governorABI.abi, true)
  const [formattedEvents, setFormattedEvents] = useState()
  const [allProposals, setProposals] = React.useState()


  React.useEffect(() => {
    if (!!contract && !!formattedEvents) {
      getProposals(contract, formattedEvents).then(p => setProposals(p))
    }
  }, [contract, formattedEvents]) 

  
  
  // create filter for these specific events
  const filter = useMemo(() => ({ ...contract?.filters?.['ProposalCreated'](), fromBlock: 0, toBlock: 'latest' }), [
    contract,
  ])


  useEffect(() => {
    if (!!library) {
      async function fetchData() {
        const pastEvents = await library.getLogs(filter)
        const formattedEventData = pastEvents
          .map((event) => {
            const eventParsed = eventParser.parseLog(event).args
            return {
              description: eventParsed.description,
              details: eventParsed.targets.map((target, i) => {
                const signature = eventParsed.signatures[i]
                const [name] = signature.substr(0, signature.length - 1).split('(')
                const calldata = eventParsed.calldatas[i]  
                return {
                  target,
                  functionSig: name,
                  callData: calldata,
                }
              }),
            }
          })
          .reverse()
        setFormattedEvents(formattedEventData)
      }
      if (!formattedEvents) {
        fetchData()
      }
    }
  }, [filter, library, formattedEvents])


  return (
    <Provider
        value={{
          proposals: allProposals
        }}
      >
      {props.children}
    </Provider>
  )
} 

export {ProposalsProvider, Consumer as UserConsumer, ProposalsContext};