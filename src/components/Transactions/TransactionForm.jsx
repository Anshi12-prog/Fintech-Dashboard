import React, { useState } from 'react'

export default function TransactionForm({ initial, onClose, onSave }) {
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState(initial ? Math.abs(initial.amount) : '')
  const [type, setType] = useState(initial?.type || 'expense')
  const [category, setCategory] = useState(initial?.category || '')
  const [note, setNote] = useState(initial?.note || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const val = Number(amount) * (type === 'expense' ? -1 : 1)
    onSave({ date, amount: val, type, category, note })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md ui-transition transform transition-all">
        <h3 className="text-lg font-medium mb-3">{initial ? 'Edit' : 'Add'} Transaction</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm">Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full border rounded px-2 py-1" />
          </div>

          <div>
            <label className="text-sm">Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="0.01" className="w-full border rounded px-2 py-1" />
          </div>

          <div className="flex gap-2">
            <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-2 py-1 w-1/2">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="border rounded px-2 py-1 flex-1" />
          </div>

          <div>
            <label className="text-sm">Note</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note" className="w-full border rounded px-2 py-1" />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  )
}
