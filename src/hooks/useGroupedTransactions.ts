import { useMemo } from 'react'
import type { Transaction } from '../types/transaction'
import { toDateKey } from '../utils/formatDate'

export interface TransactionGroup {
  dateKey: string
  transactions: Transaction[]
}

/** 取引一覧を日付ごとにグルーピングする。入力の並び順（新しい順）はそのまま維持される */
export function useGroupedTransactions(transactions: Transaction[]): TransactionGroup[] {
  return useMemo(() => {
    const groups = new Map<string, Transaction[]>()
    for (const transaction of transactions) {
      const key = toDateKey(transaction.occurredAt)
      const existing = groups.get(key)
      if (existing) {
        existing.push(transaction)
      } else {
        groups.set(key, [transaction])
      }
    }
    return Array.from(groups.entries()).map(([dateKey, txns]) => ({
      dateKey,
      transactions: txns,
    }))
  }, [transactions])
}
