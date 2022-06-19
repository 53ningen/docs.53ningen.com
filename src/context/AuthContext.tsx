import { CognitoUser } from '@aws-amplify/auth'
import { HubCallback } from '@aws-amplify/core'
import { Auth, Hub } from 'aws-amplify'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

type AuthContextProps = {
  isAuthenticated: boolean
  user?: CognitoUser
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  error: any
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  signOut: async () => {},
  signIn: async () => {},
  error: undefined,
})

export const useAuthContext = () => useContext(AuthContext)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<CognitoUser>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<any>()

  useEffect(() => {
    const updateStates = async () => {
      try {
        const u: CognitoUser = await Auth.currentAuthenticatedUser()
        setUser(u)
        setIsAuthenticated(true)
      } catch (e) {
        setError(e)
        setUser(undefined)
        setIsAuthenticated(false)
      }
    }
    const listener: HubCallback = async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          await updateStates()
          break
        case 'signOut':
          await updateStates()
          break
      }
    }
    if (!mounted) {
      Hub.listen('auth', listener)
      updateStates()
      setMounted(true)
    }
  }, [mounted])
  const signIn = async (username: string, password: string) => {
    try {
      await Auth.signIn(username, password)
      const u: CognitoUser = await Auth.currentAuthenticatedUser()
      setUser(u)
      setIsAuthenticated(true)
    } catch (e) {
      setError(e)
      setUser(undefined)
      setIsAuthenticated(false)
    }
  }
  const signOut = async () => {
    await Auth.signOut()
    setUser(undefined)
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, error }}>{children}</AuthContext.Provider>
  )
}
