import { AppLayout } from '../../components/AppLayout/AppLayout'
import { BalanceDisplay } from '../../components/BalanceDisplay/BalanceDisplay'
import { TransactionList } from '../../components/TransactionList/TransactionList'
import { useCard } from '../../hooks/useCard'
import { mockTransactions } from '../../data/mockTransactions'
import styles from './HistoryPage.module.css'

export function HistoryPage() {
  const { balance } = useCard()

  return (
    <AppLayout>
      <section className={styles.balanceSection} aria-label="現在残高">
        <BalanceDisplay balance={balance} compact />
      </section>
      <TransactionList transactions={mockTransactions} emptyMessage="利用履歴はまだありません。" />
    </AppLayout>
  )
}
