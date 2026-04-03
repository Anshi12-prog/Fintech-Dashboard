import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { initialTransactions } from '../utils/mockData'
import { uid } from '../utils/helpers'

const TransactionsContext = createContext()

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const raw = localStorage.getItem('transactions_v1')
      return raw ? JSON.parse(raw) : initialTransactions
    } catch (e) {
      return initialTransactions
    }
  })
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'Viewer')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('transactions_v1', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('role', role)
  }, [role])

  // Fetch transactions (try backend, fall back to localStorage)
  const API_BASE = 'http://localhost:4000'

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const resp = await axios.get(`${API_BASE}/transactions`, { timeout: 2000 })
      setTransactions(resp.data)
      localStorage.setItem('transactions_v1', JSON.stringify(resp.data))
      setLoading(false)
      return resp.data
    } catch (e) {
      // fallback: use local storage / in-memory
      setTimeout(() => setLoading(false), 250)
      return transactions
    }
  }

  const addTransaction = async (tx) => {
    const newTx = { ...tx, id: uid(), date: tx.date }
    // optimistic update
    setTransactions((prev) => [newTx, ...prev])
    try {
      await axios.post(`${API_BASE}/transactions`, newTx)
      // if backend succeeded, refresh to ensure consistent ordering
      fetchTransactions()
    } catch (e) {
      // keep local copy; persist to localStorage
      localStorage.setItem('transactions_v1', JSON.stringify([newTx, ...transactions]))
    }
  }

  const editTransaction = async (id, updates) => {
    // optimistic update
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
    try {
      await axios.put(`${API_BASE}/transactions/${id}`, updates)
      fetchTransactions()
    } catch (e) {
      // fallback persisted locally
      const after = transactions.map((t) => (t.id === id ? { ...t, ...updates } : t))
      localStorage.setItem('transactions_v1', JSON.stringify(after))
    }
  }

  const value = {
    transactions,
    fetchTransactions,
    addTransaction,
    editTransaction,
    role,
    setRole,
    loading,
  }

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
}

export const useTransactions = () => useContext(TransactionsContext)
