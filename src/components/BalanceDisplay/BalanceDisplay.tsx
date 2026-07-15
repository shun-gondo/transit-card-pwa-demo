import { formatYen } from '../../utils/formatCurrency'
import { formatDateTimeLabel } from '../../utils/formatDate'
import styles from './BalanceDisplay.module.css'

interface BalanceDisplayProps {
  balance: number
  lastUpdatedAt?: string
  compact?: boolean
  label?: string
  onRefresh?: () => void
  refreshing?: boolean
}

export function BalanceDisplay({
  balance,
  lastUpdatedAt,
  compact = false,
  label,
  onRefresh,
  refreshing = false,
}: BalanceDisplayProps) {
  return (
    <div className={compact ? `${styles.wrapper} ${styles.compact}` : styles.wrapper}>
      <p className={styles.label}>{label ?? (compact ? '現在残高' : '残高')}</p>
      <p className={styles.balance}>{formatYen(balance)}</p>
      {lastUpdatedAt ? (
        <p className={styles.updatedAt}>
          最終更新 {formatDateTimeLabel(lastUpdatedAt)}
          {onRefresh ? (
            <button
              type="button"
              className={styles.refreshButton}
              onClick={onRefresh}
              disabled={refreshing}
              aria-label="残高を更新"
              aria-busy={refreshing}
            >
              <svg
                className={refreshing ? styles.refreshIconSpinning : undefined}
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}
