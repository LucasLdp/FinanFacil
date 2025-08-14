import type { IUser } from '@/dtos/IUser'
import { api } from '@/service/api'
import type { ReactNode } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

interface ILogin {
  email: string
  password: string
}

interface IAuthContext {
  user: IUser | null
  isAuthenticated: boolean
  login: (data: ILogin) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface IAuthProvider {
  children: ReactNode
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const storedUser = localStorage.getItem('@FinanFacil:user')
    const storedToken = localStorage.getItem('@FinanFacil:token')

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Erro ao carregar usuário do storage:', error)
        localStorage.removeItem('@FinanFacil:user')
        localStorage.removeItem('@FinanFacil:token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (data: ILogin): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await api.post('/auth/login', data)

      // A resposta tem a estrutura: { success, message, result: { user, token } }
      const { user, token } = response.data.result

      localStorage.setItem('@FinanFacil:user', JSON.stringify(user))
      localStorage.setItem('@FinanFacil:token', token)

      setUser(user)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('Credenciais inválidas')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    setUser(null)
    localStorage.removeItem('@FinanFacil:user')
    localStorage.removeItem('@FinanFacil:token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
