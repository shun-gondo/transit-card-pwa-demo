import styles from './TransitCard.module.css'

interface TransitCardProps {
  holderAlias?: string
}

function BrandGlyph() {
  return (
    <svg className={styles.brandGlyph} viewBox="0 0 512 512" role="img" aria-hidden="true">
      <rect width="512" height="512" rx="96" fill="currentColor" />
      <rect x="126" y="176" width="260" height="168" rx="26" fill="var(--color-primary)" />
      <rect x="156" y="206" width="64" height="46" rx="9" fill="currentColor" />
      <path
        d="M 300 236 A 40 40 0 0 1 340 276"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 300 208 A 68 68 0 0 1 368 276"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

export function TransitCard({ holderAlias = '通勤用' }: TransitCardProps) {
  return (
    <div className={styles.frame}>
      <div
        className={styles.card}
        role="img"
        aria-label="オリジナルデザインの交通系ICカード（デモ）"
      >
        <div className={styles.greenPanel} aria-hidden="true" />

        <BrandGlyph />

        <p className={styles.holder}>{holderAlias}</p>

        <div className={styles.wordmark} aria-hidden="true">
          Suica
        </div>
      </div>
    </div>
  )
}
