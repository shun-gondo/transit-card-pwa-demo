import type { Transaction } from '../../types/transaction'
import { useGroupedTransactions } from '../../hooks/useGroupedTransactions'
import { formatDateLabel } from '../../utils/formatDate'
import { EmptyState } from '../EmptyState/EmptyState'
import { TransactionItem } from '../TransactionItem/TransactionItem'
import styles from './TransactionList.module.css'

interface TransactionListProps {
  transactions: Transaction[]
  groupByDate?: boolean
  showBalanceAfter?: boolean
  emptyMessage?: string
}

export function TransactionList({
  transactions,
  groupByDate = true,
  showBalanceAfter = true,
  emptyMessage = '利用履歴はまだありません。',
}: TransactionListProps) {
  const groups = useGroupedTransactions(transactions)

  if (transactions.length === 0) {
    return (
      <EmptyState
        title={emptyMessage}
        description="鉄道・バスの利用やお店での支払いがあるとここに表示されます。"
      />
    )
  }

  if (!groupByDate) {
    return (
      <ul className={styles.items}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            showBalanceAfter={showBalanceAfter}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <section
          key={group.dateKey}
          className={styles.group}
          aria-label={formatDateLabel(group.transactions[0].occurredAt)}
        >
          <p className={styles.groupHeading}>{formatDateLabel(group.transactions[0].occurredAt)}</p>
          <ul className={styles.items}>
            {group.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                showBalanceAfter={showBalanceAfter}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
