export const uid = () => Math.random().toString(36).slice(2, 9)

export const formatCurrency = (n) => {
  const abs = Math.abs(n)
  return (n < 0 ? '-$' : '$') + abs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const sum = (arr) => arr.reduce((s, x) => s + x, 0)

export const groupBy = (arr, keyFn) => {
  return arr.reduce((acc, item) => {
    const k = keyFn(item)
    acc[k] = acc[k] || []
    acc[k].push(item)
    return acc
  }, {})
}
