import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { initialCardState } from '../data/mockCard'
import type { CardState } from '../types/transaction'
import { CardContext, type CardContextValue } from './cardContextInstance'

const LAST_UPDATED_STORAGE_KEY = 'transit-pass-demo:last-updated-at'

function readStoredLastUpdatedAt(): string | null {
  try {
    return localStorage.getItem(LAST_UPDATED_STORAGE_KEY)
  } catch {
    return null
  }
}

export function CardProvider({ children }: { children: ReactNode }) {
  const [cardState, setCardState] = useState<CardState>(() => ({
    ...initialCardState,
    lastUpdatedAt: readStoredLastUpdatedAt() ?? initialCardState.lastUpdatedAt,
  }))
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshBalance = useCallback(() => {
    setIsRefreshing(true)
    // 外部APIへは接続しない。ローカルモックデータを再読込し、更新時刻のみ現在時刻にする
    window.setTimeout(() => {
      const now = new Date().toISOString()
      setCardState((prev) => ({
        ...prev,
        balance: initialCardState.balance,
        lastUpdatedAt: now,
      }))
      try {
        localStorage.setItem(LAST_UPDATED_STORAGE_KEY, now)
      } catch {
        // localStorageが使用できない環境でもアプリの動作は継続する
      }
      setIsRefreshing(false)
    }, 500)
  }, [])

  const value = useMemo<CardContextValue>(
    () => ({ ...cardState, isRefreshing, refreshBalance }),
    [cardState, isRefreshing, refreshBalance],
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}
