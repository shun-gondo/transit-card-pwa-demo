import { createContext } from 'react'
import type { CardState } from '../types/transaction'

export interface CardContextValue extends CardState {
  isRefreshing: boolean
  refreshBalance: () => void
}

export const CardContext = createContext<CardContextValue | undefined>(undefined)
