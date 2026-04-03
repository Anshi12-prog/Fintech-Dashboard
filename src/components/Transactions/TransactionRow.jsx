import React from 'react'
import { formatCurrency } from '../../utils/helpers'

export default function TransactionRow({ tx, onEdit, role }) {
  return (
    <tr className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 ui-transition">
      <td className="px-2 py-3 text-sm">{tx.date}</td>
      <td className="px-2 py-3 text-sm">{tx.category}</td>
      <td className="px-2 py-3 text-sm">{tx.note || '-'}</td>
      <td className={`px-2 py-3 font-medium ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(tx.amount)}</td>
      <td className="px-2 py-3 text-sm capitalize">{tx.type}</td>
      {role === 'Admin' && (
        <td className="px-2 py-3">
          <button onClick={onEdit} className="text-sm text-blue-600 hover:underline">Edit</button>
        </td>
      )}
    </tr>
  )
}
