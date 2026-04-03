import React, { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    try {
      const raw = localStorage.getItem('dark_mode')
      return raw ? JSON.parse(raw) : false
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('dark_mode', JSON.stringify(dark))
    } catch (e) {}
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  const toggle = () => setDark((d) => !d)

  return <DarkModeContext.Provider value={{ dark, toggle }}>{children}</DarkModeContext.Provider>
}

export const useDarkMode = () => useContext(DarkModeContext)

export default DarkModeContext
