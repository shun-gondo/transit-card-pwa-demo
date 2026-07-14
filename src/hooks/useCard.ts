import { useContext } from 'react'
import { CardContext, type CardContextValue } from '../context/cardContextInstance'

export function useCard(): CardContextValue {
  const ctx = useContext(CardContext)
  if (!ctx) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return ctx
}
