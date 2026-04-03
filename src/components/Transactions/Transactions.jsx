import React, { useEffect, useMemo, useState } from 'react'
import { useTransactions } from '../../context/TransactionsContext'
import TransactionRow from './TransactionRow'
import TransactionForm from './TransactionForm'
import { formatCurrency } from '../../utils/helpers'

export default function Transactions() {
  const { transactions, addTransaction, editTransaction, role, fetchTransactions, loading } = useTransactions()

  const [q, setQ] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('date_desc')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    // listen for global quick-add events (from FloatingAdd)
    const handler = () => openAdd()
    window.addEventListener('openAddTransaction', handler)
    return () => window.removeEventListener('openAddTransaction', handler)
  }, [])

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  const filtered = useMemo(() => {
    let out = transactions
    if (q) out = out.filter((t) => t.category.toLowerCase().includes(q.toLowerCase()) || (t.note || '').toLowerCase().includes(q.toLowerCase()))
    if (categoryFilter !== 'All') out = out.filter((t) => t.category === categoryFilter)
    if (typeFilter !== 'All') out = out.filter((t) => t.type === typeFilter.toLowerCase())

    if (sortBy === 'date_desc') out = out.sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sortBy === 'date_asc') out = out.sort((a, b) => new Date(a.date) - new Date(b.date))
    if (sortBy === 'amount_desc') out = out.sort((a, b) => b.amount - a.amount)
    if (sortBy === 'amount_asc') out = out.sort((a, b) => a.amount - b.amount)
    return out
  }, [transactions, q, categoryFilter, typeFilter, sortBy])

  const openAdd = () => {
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (tx) => {
    setEditing(tx)
    setShowForm(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="flex items-center gap-3">
          {role === 'Admin' && (
            <button onClick={openAdd} className="px-3 py-1 bg-blue-600 text-white rounded">Add Transaction</button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
          <div className="flex items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search category or note" className="border rounded px-2 py-1" />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border rounded px-2 py-1">
              <option>All</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border rounded px-2 py-1">
              <option>All</option>
              <option>income</option>
              <option>expense</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 py-1">
              <option value="date_desc">Date ↓</option>
              <option value="date_asc">Date ↑</option>
              <option value="amount_desc">Amount ↓</option>
              <option value="amount_asc">Amount ↑</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-4">
            {/* skeleton rows */}
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 rounded w-full skeleton" />
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <div className="mb-2">No transactions found</div>
            {role === 'Admin' ? (
              <button onClick={openAdd} className="px-3 py-1 bg-blue-600 text-white rounded">Add your first transaction</button>
            ) : (
              <div className="text-sm text-gray-400">Switch to Admin to add transactions</div>
            )}
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2">Category</th>
                  <th className="px-2 py-2">Note</th>
                  <th className="px-2 py-2">Amount</th>
                  <th className="px-2 py-2">Type</th>
                  {role === 'Admin' && <th className="px-2 py-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <TransactionRow key={t.id} tx={t} onEdit={() => openEdit(t)} role={role} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <TransactionForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSave={(data) => {
            if (editing) {
              editTransaction(editing.id, data)
            } else {
              addTransaction(data)
            }
            setShowForm(false)
          }}
        />
      )}
    </div>
  )
}
