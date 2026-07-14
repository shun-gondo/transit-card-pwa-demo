import type { TransactionType } from '../../types/transaction'
import styles from './TransactionIcon.module.css'

interface TransactionIconProps {
  type: TransactionType
}

const labels: Record<TransactionType, string> = {
  train: '鉄道利用',
  bus: 'バス利用',
  shopping: '買い物',
  charge: 'チャージ',
  adjustment: '取消・調整',
}

function Glyph({ type }: { type: TransactionType }) {
  switch (type) {
    case 'train':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="5"
            y="4"
            width="14"
            height="13"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="9" cy="14" r="1.4" fill="currentColor" />
          <circle cx="15" cy="14" r="1.4" fill="currentColor" />
          <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'bus':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="6"
            width="16"
            height="11"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M4 11h16" stroke="currentColor" strokeWidth="2" />
          <circle cx="8" cy="19" r="1.4" fill="currentColor" />
          <circle cx="16" cy="19" r="1.4" fill="currentColor" />
        </svg>
      )
    case 'shopping':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 9h10l1 11H6L7 9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M9 9V7a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'charge':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'adjustment':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 12a6 6 0 1 1 2.2 4.65"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 17v-4h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}

export function TransactionIcon({ type }: TransactionIconProps) {
  return (
    <span className={`${styles.badge} ${styles[type]}`} aria-hidden="true" title={labels[type]}>
      <Glyph type={type} />
    </span>
  )
}
