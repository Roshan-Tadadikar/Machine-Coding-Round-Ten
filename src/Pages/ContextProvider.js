import React, { createContext } from 'react'

export const ProvideContext = createContext()
const ContextProvider = ({children}) => {
  return (
    <ProvideContext.Provider>{children}</ProvideContext.Provider>
  )
}

export default ContextProvider