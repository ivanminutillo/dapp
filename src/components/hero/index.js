import React from 'react'

export const Hero = () => {
  return (
    <div className="max-w-screen-md mx-auto mt-16 text-center">
      <div className="text-4xl font-bold text-center text-gray-100">Governor simple proposals list</div>
      <div className="mt-4 text-lg text-center text-gray-300">This demo shows how to use react context and hooks to connect to metamask and retrieve the list of proposals.</div>
      <a href="github.com/ivanminutillo" className="inline-block mt-4 text-base text-center text-green-500 underline">How it works</a>
    </div>
  )
}