import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { TransactionsProvider } from './context/TransactionsContext'
import { DarkModeProvider } from './context/DarkModeContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </DarkModeProvider>
  </React.StrictMode>
)
