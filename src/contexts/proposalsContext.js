import React from 'react'


const proposals = [
  {
    id: 1,
    title: 'Add LINK support',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
    delegated: "70%"
  },
  {
    id: 2,
    title: 'Legacy market maintenance: WBTC and REP',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
    delegated: "30%"
  },
  {
    id: 3,
    title: 'User Interface Designer',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
    delegated: "47%"
  },
]


let ProposalsContext;

const {Provider, Consumer} = ProposalsContext = React.createContext()

const ProposalsProvider = (props) => {
  return (
    <Provider
        value={{
          proposals: proposals
        }}
      >
      {props.children}
    </Provider>
  )
} 

export {ProposalsProvider, Consumer as UserConsumer, ProposalsContext};