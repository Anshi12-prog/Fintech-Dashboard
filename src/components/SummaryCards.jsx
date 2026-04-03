import React from 'react'
import { useTransactions } from '../context/TransactionsContext'
import { formatCurrency } from '../utils/helpers'

function Icon({ name }) {
  if (name === 'balance')
    return (
      <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 1.79 8 4s-3.582 4-8 4-8-1.79-8-4 3.582-4 8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4" />
      </svg>
    )
  if (name === 'income')
    return (
      <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V3m0 0L8 7m4-4 4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21H3v-2a4 4 0 014-4h10a4 4 0 014 4v2z" />
      </svg>
    )
  return (
    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13v8m0 0l-4-4m4 4 4-4M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
    </svg>
  )
}

export default function SummaryCards() {
  const { transactions } = useTransactions()

  const total = transactions.reduce((s, t) => s + t.amount, 0)
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0)

  const cards = [
    { title: 'Total Balance', value: total, accent: 'text-green-700' },
    { title: 'Total Income', value: income, accent: 'text-softblue' },
    { title: 'Total Expenses', value: -expenses, accent: 'text-red-400' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      {cards.map((c, idx) => (
        <div key={c.title} className="card ui-transition hover:scale-[1.01] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{c.title}</div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center"> 
                <Icon name={idx === 0 ? 'balance' : idx === 1 ? 'income' : 'expense'} />
              </div>
            </div>
          </div>
          <div className={`text-2xl font-semibold mt-3 ${c.accent}`}>{formatCurrency(c.value)}</div>
          <div className="text-xs text-gray-400 mt-2">Monthly overview</div>
        </div>
      ))}
    </div>
  )
}
