import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useTransactions } from '../../context/TransactionsContext'

const COLORS = ['#89C9FF', '#7BD389', '#FDD6E0', '#FFE2A8', '#BDE7FF', '#A7F3D0']

export default function CategoryDonut() {
  const { transactions } = useTransactions()
  const expenses = transactions.filter((t) => t.type === 'expense')
  const byCat = {}
  expenses.forEach((t) => {
    byCat[t.category] = (byCat[t.category] || 0) + Math.abs(t.amount)
  })
  const data = Object.entries(byCat).map(([name, value]) => ({ name, value }))

  if (data.length === 0) return <div className="text-sm text-gray-500">No expense data</div>

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} innerRadius={50} outerRadius={90} paddingAngle={3} label isAnimationActive={true} animationDuration={800}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
