import { createContext, FC, ReactNode, useContext, useState } from 'react'

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (loading: boolean) => {},
})

export const useLoadingContext = () => useContext(LoadingContext)

type LoadingProviderProps = {
  children: ReactNode
}

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const setLoading = (loading: boolean) => {
    if (loading !== isLoading) {
      setIsLoading(loading)
    }
  }
  return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>
}
