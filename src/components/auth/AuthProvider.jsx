import React, { createContext, useState, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
})

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const handleLogin = (token) => {
    const decodeToken = jwtDecode(token)
    localStorage.setItem("userId", decodeToken.sub)
    localStorage.setItem("userRole", decodeToken.roles)
    localStorage.setItem("token", token)
    setUser(decodeToken)
  }

  const [logoutMessage, setLogoutMessage] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
    setLogoutMessage("You have been logged out successfully!")
  }

  return (
    <AuthContext.Provider value={{user, handleLogin, handleLogout, logoutMessage, setLogoutMessage}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
