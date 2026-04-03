import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SummaryCards from './components/SummaryCards'
import BalanceChart from './components/Charts/BalanceChart'
import CategoryDonut from './components/Charts/CategoryDonut'
import Transactions from './components/Transactions/Transactions'
import Insights from './components/Insights'
import FloatingAdd from './components/FloatingAdd'

export default function App() {
  const [active, setActive] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 p-6 lg:p-10">
        <div className="app-container">
          <Header setMobileOpen={setMobileOpen} />

          {active === 'dashboard' && (
            <div className="space-y-6">
              <SummaryCards />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card">
                  <h3 className="text-lg font-medium mb-2">Balance Trend</h3>
                  <BalanceChart />
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-2">Spending Breakdown</h3>
                  <CategoryDonut />
                </div>
              </div>

              <Insights />
            </div>
          )}

          {active === 'transactions' && <Transactions />}
        </div>
      </div>
      <FloatingAdd onClick={() => {
        // open the add modal by dispatching a simple event
        window.dispatchEvent(new CustomEvent('openAddTransaction'))
      }} />
    </div>
  )
}
