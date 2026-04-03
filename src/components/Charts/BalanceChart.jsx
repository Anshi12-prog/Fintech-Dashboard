import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useTransactions } from '../../context/TransactionsContext'

function buildSeries(transactions) {
  // group by date and compute cumulative balance
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  const series = []
  let balance = 0
  sorted.forEach((t) => {
    balance += t.amount
    series.push({ date: t.date, balance })
  })
  // reduce to one point per date (keep last)
  const map = {}
  series.forEach((s) => (map[s.date] = s))
  return Object.values(map)
}

export default function BalanceChart() {
  const { transactions } = useTransactions()
  const data = buildSeries(transactions)

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#89C9FF" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#89C9FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorBalance)"
            isAnimationActive={true}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
