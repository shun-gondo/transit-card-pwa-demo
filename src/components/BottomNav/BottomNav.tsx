import { Link, useLocation } from 'react-router-dom'
import styles from './BottomNav.module.css'

function CardsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect
        x="3"
        y="7"
        width="15"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="6"
        y="4"
        width="15"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="5" cy="6" r="1.4" fill="currentColor" />
      <circle cx="5" cy="12" r="1.4" fill="currentColor" />
      <circle cx="5" cy="18" r="1.4" fill="currentColor" />
      <path
        d="M9.5 6h10M9.5 12h10M9.5 18h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

const NAV_ITEMS = [
  { to: '/', label: '一覧', Icon: CardsIcon },
  { to: '/history', label: '利用履歴', Icon: ListIcon },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className={styles.nav} aria-label="メインナビゲーション">
      {NAV_ITEMS.map(({ to, label, Icon }) => {
        const isActive = location.pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={isActive ? `${styles.item} ${styles.active}` : styles.item}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
