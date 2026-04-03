import React from 'react'

export default function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Desktop */}
      <aside className="w-64 hidden lg:block bg-white dark:bg-gray-800 border-r dark:border-gray-700 ui-transition">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
              <img src="/src/assets/zen-logo.svg" alt="ZenFinance" className="h-10 w-10 rounded" />
              <div>
                <div className="text-sm font-semibold">ZenFinance</div>
                <div className="text-xs text-gray-400">Personal</div>
              </div>
            </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActive('dashboard')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 ${active === 'dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActive('transactions')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 ${active === 'transactions' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3z" />
              </svg>
              <span>Transactions</span>
            </button>
          </nav>

          <div className="mt-auto text-xs text-gray-400">© {new Date().getFullYear()} FFinDash</div>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
        <aside className={`absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">FF</div>
                <div>
                  <div className="text-sm font-semibold">FFinDash</div>
                  <div className="text-xs text-gray-400">Personal</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">Close</button>
            </div>

            <nav className="space-y-2">
              <button onClick={() => { setActive('dashboard'); setMobileOpen(false) }} className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 ${active === 'dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                </svg>
                <span>Dashboard</span>
              </button>

              <button onClick={() => { setActive('transactions'); setMobileOpen(false) }} className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 ${active === 'transactions' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3z" />
                </svg>
                <span>Transactions</span>
              </button>
            </nav>
          </div>
        </aside>
      </div>
    </>
  )
}
