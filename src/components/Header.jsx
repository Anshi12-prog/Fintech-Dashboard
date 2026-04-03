import React, { useEffect, useRef, useState } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import { useDarkMode } from '../context/DarkModeContext'

export default function Header({ setMobileOpen }) {
  const { role, setRole } = useTransactions()

  const { dark, toggle } = useDarkMode()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const fileRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    try {
      const url = localStorage.getItem('user_avatar')
      if (url) setAvatarUrl(url)
    } catch (e) {}
  }, [])

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result
      setAvatarUrl(data)
      try {
        localStorage.setItem('user_avatar', data)
      } catch (e) {}
    }
    reader.readAsDataURL(f)
  }

  const openPicker = () => fileRef.current && fileRef.current.click()

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
  <h1 className="text-2xl font-semibold">ZenFinance</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track and understand your financial activity</p>
      </div>

      <div className="flex items-center gap-4">
        {/* mobile nav for small screens */}
        <div className="block lg:hidden">
          <button onClick={() => setMobileOpen && setMobileOpen(true)} className="p-2 rounded bg-white dark:bg-gray-700 border mr-2"> 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded px-2 py-1 bg-white dark:bg-gray-700"
          >
            <option>Viewer</option>
            <option>Admin</option>
          </select>
        </div>

        <button
          onClick={toggle}
          className="ml-2 p-2 rounded-full border hover:shadow ui-transition bg-white dark:bg-gray-700"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zM4 10a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H4.75A.75.75 0 014 10zM14 10a.75.75 0 01.75-.75H16a.75.75 0 010 1.5h-1.25A.75.75 0 0114 10zM5.22 5.22a.75.75 0 011.06 0L7.28 6.22a.75.75 0 11-1.06 1.06L5.22 6.28a.75.75 0 010-1.06zM12.72 12.72a.75.75 0 011.06 0l1 1a.75.75 0 11-1.06 1.06l-1-1a.75.75 0 010-1.06zM12.72 5.28a.75.75 0 010 1.06l-1 1a.75.75 0 11-1.06-1.06l1-1a.75.75 0 011.06 0zM6.22 12.78a.75.75 0 010 1.06l-1 1a.75.75 0 11-1.06-1.06l1-1a.75.75 0 011.06 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 0010.586 10.586z" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-3 ml-3">
          <div className="text-right mr-3">
            <div className="text-sm text-gray-500">Signed in as</div>
            <div className="font-medium">Alex</div>
          </div>
          <div className="relative">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
            <div
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={openPicker}
              role="button"
              aria-label="Open avatar picker"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm sm:text-base md:text-lg font-semibold flex-shrink-0 cursor-pointer ring-2 ring-white/40 dark:ring-gray-700 shadow-md hover:scale-105 ui-transition"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <span>A</span>
              )}
            </div>

            {hovering && (
              <div className="absolute left-1/2 -top-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                View profile · Click to change
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
