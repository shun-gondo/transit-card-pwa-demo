import { Link } from 'react-router-dom'
import type { Transaction } from '../../types/transaction'
import { TransactionList } from '../TransactionList/TransactionList'
import styles from './RecentTransactions.module.css'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

const RECENT_COUNT = 3

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, RECENT_COUNT)

  return (
    <section className={styles.wrapper} aria-labelledby="recent-transactions-heading">
      <div className={styles.headingRow}>
        <h2 id="recent-transactions-heading" className={styles.heading}>
          最近の利用履歴
        </h2>
        <Link to="/history" className={styles.viewAllLink}>
          利用履歴をすべて見る
        </Link>
      </div>
      <TransactionList
        transactions={recent}
        groupByDate={false}
        showBalanceAfter={false}
        emptyMessage="まだ利用履歴がありません。"
      />
    </section>
  )
}
