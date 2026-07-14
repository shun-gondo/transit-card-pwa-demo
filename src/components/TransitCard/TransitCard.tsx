import styles from './TransitCard.module.css'

interface TransitCardProps {
  holderAlias?: string
}

/**
 * オリジナルデザインのICカード表現。実在カードの券面は複製せず、
 * 独自のチップ＋タップ波紋モチーフのみで構成する。データには非依存。
 */
export function TransitCard({ holderAlias = 'DEMO USER' }: TransitCardProps) {
  return (
    <div className={styles.card} role="img" aria-label="オリジナルデザインの交通系ICカード（デモ）">
      <div className={styles.topRow}>
        <span className={styles.brandLabel}>TRANSIT PASS</span>
        <div className={styles.chip} aria-hidden="true" />
      </div>
      <div>
        <svg className={styles.waveMark} viewBox="0 0 100 100" aria-hidden="true">
          <path
            d="M40 55 A18 18 0 0 1 58 73"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M40 40 A33 33 0 0 1 73 73"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
      <div>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.holder}>{holderAlias}</p>
      </div>
    </div>
  )
}
