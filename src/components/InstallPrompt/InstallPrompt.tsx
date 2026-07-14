import { useInstallPrompt } from '../../hooks/useInstallPrompt'
import { useLocalStorageBoolean } from '../../hooks/useLocalStorageBoolean'
import styles from './InstallPrompt.module.css'

const STORAGE_KEY = 'transit-pass-demo:install-prompt-dismissed'

export function InstallPrompt() {
  const { isInstalled, canPromptInstall, showIOSInstructions, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useLocalStorageBoolean(STORAGE_KEY, false)

  if (isInstalled || dismissed || (!canPromptInstall && !showIOSInstructions)) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M12 8v5m0 0-2.2-2.2M12 13l2.2-2.2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.body}>
        <p className={styles.title}>ホーム画面に追加できます</p>
        <p className={styles.description}>
          {showIOSInstructions
            ? '共有ボタンから「ホーム画面に追加」を選ぶと、アプリのように起動できます。'
            : 'インストールすると、アプリのように起動できます。'}
        </p>
      </div>
      {canPromptInstall ? (
        <button type="button" className={styles.installButton} onClick={() => void promptInstall()}>
          追加する
        </button>
      ) : null}
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => setDismissed(true)}
        aria-label="インストール案内を閉じる"
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
