import { useLocalStorageBoolean } from '../../hooks/useLocalStorageBoolean'
import styles from './DemoNotice.module.css'

const STORAGE_KEY = 'transit-pass-demo:demo-notice-dismissed'

export function DemoNotice() {
  const [dismissed, setDismissed] = useLocalStorageBoolean(STORAGE_KEY, false)

  if (dismissed) {
    return null
  }

  return (
    <div className={styles.notice} role="note" aria-label="デモに関する注意書き">
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.2" fill="currentColor" />
      </svg>
      <p className={styles.text}>
        本アプリはフロントエンド学習用のデモです。実在する交通事業者、交通系ICカードおよび決済サービスとは関係ありません。
      </p>
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => setDismissed(true)}
        aria-label="この注意書きを閉じる"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
