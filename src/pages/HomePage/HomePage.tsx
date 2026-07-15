import { useState } from 'react'
import { AppLayout } from '../../components/AppLayout/AppLayout'
import { BalanceDisplay } from '../../components/BalanceDisplay/BalanceDisplay'
import { ActionButton } from '../../components/ActionButton/ActionButton'
import { TransitCard } from '../../components/TransitCard/TransitCard'
import { InstallPrompt } from '../../components/InstallPrompt/InstallPrompt'
import { Modal } from '../../components/Modal/Modal'
import { useCard } from '../../hooks/useCard'
import styles from './HomePage.module.css'

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.29c-.77.35-1 .77-1 1.46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function HomePage() {
  const { balance, lastUpdatedAt, holderAlias, isRefreshing, refreshBalance } = useCard()
  const [isDepositModalOpen, setDepositModalOpen] = useState(false)
  const [isInfoModalOpen, setInfoModalOpen] = useState(false)

  return (
    <AppLayout>
      <section className={styles.cardSection} aria-label="カード残高">
        <TransitCard holderAlias={holderAlias} />
        <div className={styles.balanceRow}>
          <BalanceDisplay
            balance={balance}
            lastUpdatedAt={lastUpdatedAt}
            label="チャージ残高"
            onRefresh={refreshBalance}
            refreshing={isRefreshing}
          />
          <div className={styles.iconGroup}>
            <button
              type="button"
              className={styles.circleIconButton}
              aria-label="ヘルプ"
              onClick={() => setInfoModalOpen(true)}
            >
              <QuestionIcon />
            </button>
            <button
              type="button"
              className={styles.circleIconButton}
              aria-label="このアプリについて"
              onClick={() => setInfoModalOpen(true)}
            >
              <InfoIcon />
            </button>
          </div>
        </div>
        <ActionButton variant="primary" onClick={() => setDepositModalOpen(true)}>
          入金(チャージ)
        </ActionButton>
        <p className={styles.versionLabel}>ver 1.0.0</p>
      </section>

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

      {isInfoModalOpen ? (
        <Modal
          titleId="info-modal-title"
          title="これは学習用デモです"
          onClose={() => setInfoModalOpen(false)}
        >
          <p>
            本アプリはフロントエンド学習用のデモです。実在の交通系ICカードサービスとは関係ありません。表示されている残高・履歴はすべてローカルのモックデータです。
          </p>
        </Modal>
      ) : null}
    </AppLayout>
  )
}
