import React from 'react'
import {Header} from '../../components/header'
import {Hero} from '../../components/hero'
import {List} from '../../components/list'
import {UserProvider} from '../../contexts/userContext'
import {ProposalsProvider} from '../../contexts/proposalsContext'

export const Home = () => {
  return (
    <UserProvider>
      <div>
        <div className="bg-gray-800 pb-28">
          <div className="max-w-screen-xl mx-auto">
            <Header />
            <Hero />
          </div>
        </div>
        <ProposalsProvider>
          <List />
        </ProposalsProvider>
      </div>
    </UserProvider>
  )
}