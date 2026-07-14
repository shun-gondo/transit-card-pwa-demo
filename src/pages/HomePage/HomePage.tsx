import { useState } from 'react'
import { AppLayout } from '../../components/AppLayout/AppLayout'
import { BalanceDisplay } from '../../components/BalanceDisplay/BalanceDisplay'
import { ActionButton } from '../../components/ActionButton/ActionButton'
import { TransitCard } from '../../components/TransitCard/TransitCard'
import { RecentTransactions } from '../../components/RecentTransactions/RecentTransactions'
import { DemoNotice } from '../../components/DemoNotice/DemoNotice'
import { InstallPrompt } from '../../components/InstallPrompt/InstallPrompt'
import { Modal } from '../../components/Modal/Modal'
import { useCard } from '../../hooks/useCard'
import { mockTransactions } from '../../data/mockTransactions'
import styles from './HomePage.module.css'

export function HomePage() {
  const { balance, lastUpdatedAt, holderAlias, isRefreshing, refreshBalance } = useCard()
  const [isDepositModalOpen, setDepositModalOpen] = useState(false)

  return (
    <AppLayout>
      <DemoNotice />

      <section className={styles.cardSection} aria-label="カード残高">
        <TransitCard holderAlias={holderAlias} />
        <div className={styles.balanceRow}>
          <BalanceDisplay balance={balance} lastUpdatedAt={lastUpdatedAt} />
        </div>
        <div className={styles.actions}>
          <ActionButton variant="secondary" loading={isRefreshing} onClick={refreshBalance}>
            残高を更新
          </ActionButton>
          <ActionButton variant="primary" onClick={() => setDepositModalOpen(true)}>
            入金する
          </ActionButton>
        </div>
      </section>

      <RecentTransactions transactions={mockTransactions} />

      <InstallPrompt />

      {isDepositModalOpen ? (
        <Modal
          titleId="deposit-modal-title"
          title="これは学習用デモです"
          onClose={() => setDepositModalOpen(false)}
        >
          <p>
            本アプリはフロントエンド学習用のデモのため、実際の入金・決済処理は行われません。表示されている残高はローカルのモックデータです。
          </p>
        </Modal>
      ) : null}
    </AppLayout>
  )
}
