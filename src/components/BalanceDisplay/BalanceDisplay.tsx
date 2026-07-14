import { formatYen } from '../../utils/formatCurrency'
import { formatDateTimeLabel } from '../../utils/formatDate'
import styles from './BalanceDisplay.module.css'

interface BalanceDisplayProps {
  balance: number
  lastUpdatedAt?: string
  compact?: boolean
}

export function BalanceDisplay({ balance, lastUpdatedAt, compact = false }: BalanceDisplayProps) {
  return (
    <div className={compact ? `${styles.wrapper} ${styles.compact}` : styles.wrapper}>
      <p className={styles.label}>{compact ? '現在残高' : '残高'}</p>
      <p className={styles.balance}>{formatYen(balance)}</p>
      {lastUpdatedAt ? (
        <p className={styles.updatedAt}>最終更新 {formatDateTimeLabel(lastUpdatedAt)}</p>
      ) : null}
    </div>
  )
}
