# Finance Dashboard (Frontend)

React + Vite + TailwindCSS frontend for ZenFinance (calm, minimalist personal finance dashboard).

Features
- Dashboard overview with summary cards.
- Balance trend (area chart) and spending breakdown (donut chart) using Recharts.
- Transactions page with search, sorting, filters, and role-based add/edit (Admin only).
- Role selection (Viewer / Admin) saved to localStorage.
- LocalStorage persistence for transactions (mock persistence).

Setup

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

Notes
- The frontend uses localStorage for transaction persistence (file: `localStorage key transactions_v1`).
- App branding and title updated to "ZenFinance".
- The front can be wired to the provided mock backend by changing calls to use axios to `http://localhost:4000/transactions` (this demo uses local state by default).

State Management
- Transactions, role, and loading state are managed by `src/context/TransactionsContext.jsx` using React Context.
- Components consume `useTransactions()` to read and modify data.

Role switching
- The role dropdown in the top-right selects between `Viewer` and `Admin`.
- When `Admin`, add/edit controls appear on the Transactions page.
