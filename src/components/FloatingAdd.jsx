import React from 'react'
import { useTransactions } from '../context/TransactionsContext'

export default function FloatingAdd({ onClick }) {
  const { role } = useTransactions()
  if (role !== 'Admin') return null

  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 bg-primary text-white rounded-full h-14 w-14 shadow-lg flex items-center justify-center hover:scale-105 ui-transition"
      title="Quick add"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  )
}
