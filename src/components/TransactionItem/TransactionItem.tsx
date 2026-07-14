import type { Transaction } from '../../types/transaction'
import { formatSignedYen, formatYen } from '../../utils/formatCurrency'
import { formatTimeLabel } from '../../utils/formatDate'
import { TransactionIcon } from '../TransactionIcon/TransactionIcon'
import styles from './TransactionItem.module.css'

interface TransactionItemProps {
  transaction: Transaction
  showBalanceAfter?: boolean
}

export function TransactionItem({ transaction, showBalanceAfter = true }: TransactionItemProps) {
  const isCredit = transaction.amount > 0

  return (
    <li className={styles.item}>
      <TransactionIcon type={transaction.type} />
      <div className={styles.body}>
        <p className={styles.title}>{transaction.title}</p>
        <p className={styles.meta}>{formatTimeLabel(transaction.occurredAt)}</p>
      </div>
      <div className={styles.amounts}>
        <span className={`${styles.amount} ${isCredit ? styles.credit : styles.debit}`}>
          {formatSignedYen(transaction.amount)}
        </span>
        {showBalanceAfter ? (
          <span className={styles.balanceAfter}>残高 {formatYen(transaction.balanceAfter)}</span>
        ) : null}
      </div>
    </li>
  )
}
