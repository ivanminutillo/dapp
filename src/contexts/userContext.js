import React from 'react'

let UserContext;

const {Provider, Consumer} = UserContext = React.createContext()

const UserProvider = (props) => {
  return (
    <Provider
        value={{
          account: "0xf39...2266",
          balance: "0 COMP"
        }}
      >
      {props.children}
    </Provider>
  )
} 

export {UserProvider, Consumer as UserConsumer, UserContext};