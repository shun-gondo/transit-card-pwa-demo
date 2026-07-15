import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Header() {
  const location = useLocation()
  const isHistoryPage = location.pathname === '/history'

  if (isHistoryPage) {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.iconButton} aria-label="ホーム画面へ戻る">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 5 8 12l7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className={styles.pageTitle}>利用履歴</h1>
        <span className={styles.iconButtonSpacer} aria-hidden="true" />
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <span className={styles.iconButton} aria-hidden="true">
        <ProfileIcon />
      </span>
      <h1 className={styles.pageTitle}>Suica一覧</h1>
      <span className={styles.iconButton} aria-hidden="true">
        <AddIcon />
      </span>
    </header>
  )
}
