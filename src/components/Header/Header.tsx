import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

function BrandMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 512 512" role="img" aria-hidden="true">
      <rect width="512" height="512" rx="96" fill="#7FB447" />
      <rect x="126" y="176" width="260" height="168" rx="26" fill="#f4fbf8" />
      <rect x="156" y="206" width="64" height="46" rx="9" fill="#7FB447" />
      <path
        d="M 300 236 A 40 40 0 0 1 340 276"
        fill="none"
        stroke="#7FB447"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 300 208 A 68 68 0 0 1 368 276"
        fill="none"
        stroke="#7FB447"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.55"
      />
      <rect x="156" y="286" width="150" height="16" rx="8" fill="#bfe3d5" />
    </svg>
  )
}

export function Header() {
  const location = useLocation()
  const isHistoryPage = location.pathname === '/history'

  if (isHistoryPage) {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.backLink} aria-label="ホーム画面へ戻る">
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
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <BrandMark />
        <p className={styles.title}>Transit Pass Demo</p>
      </div>
    </header>
  )
}
