import {useMemo} from 'react'
import { utils } from 'ethers'
import { GOVERNANCE_ADDRESSES } from '../addresses/governances'
import { abi as GOV_ABI } from '@uniswap/governance/build/GovernorAlpha.json'
import { ChainId, useContractCall } from '@usedapp/core'

const GovernanceInterface = new utils.Interface(GOV_ABI)
const GovernanceAddress = GOVERNANCE_ADDRESSES.MAINNET

// get count of all proposals made
export function useProposalCounts() {
  const responses = useContractCall(GovernanceAddress, GovernanceInterface, 'proposalCount')
  console.log(responses)
  return useMemo(() => {
    return responses.reduce((acc, response, i) => {
      if (response.result && !response.loading) {
        return {
          ...acc,
          GovernanceAddress: parseInt(response.result[0]),
        }
      }
      return acc
    }, {})
  }, [GovernanceAddress, responses])
}
