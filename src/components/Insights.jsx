import React, { useMemo } from 'react'
import { useTransactions } from '../context/TransactionsContext'

export default function Insights() {
  const { transactions } = useTransactions()

  const totalByMonth = useMemo(() => {
    const map = {}
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7)
      map[m] = (map[m] || 0) + t.amount
    })
    return map
  }, [transactions])

  const months = Object.keys(totalByMonth).sort()
  const current = months[months.length - 1]
  const prev = months[months.length - 2]
  const percent = prev ? (((totalByMonth[current] - totalByMonth[prev]) / Math.abs(totalByMonth[prev] || 1)) * 100).toFixed(1) : null

  const spendByCat = {}
  transactions.filter((t) => t.type === 'expense').forEach((t) => (spendByCat[t.category] = (spendByCat[t.category] || 0) + Math.abs(t.amount)))
  const highest = Object.entries(spendByCat).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-2">Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-500">Highest Spending Category</div>
          <div className="font-semibold mt-1">{highest ? `${highest[0]} (${highest[1].toFixed(2)})` : 'N/A'}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Monthly Comparison</div>
          <div className="font-semibold mt-1">{prev ? `${current}: ${totalByMonth[current].toFixed(2)} vs ${prev}: ${totalByMonth[prev].toFixed(2)}` : 'Not enough data'}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Automatic Insight</div>
          <div className="font-semibold mt-1">{percent ? `${percent}% change from last month` : 'No change detected'}</div>
        </div>
      </div>
    </div>
  )
}
