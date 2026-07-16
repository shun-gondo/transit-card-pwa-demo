import styles from './TransitCard.module.css'
import logo from '../../assets/suica-logo.png'
import penguin from '../../assets/penguin.png'

interface TransitCardProps {
  holderAlias?: string
}

function BrandGlyph() {
  return <img className={styles.brandGlyph} src={logo} alt="ロゴ" />
}

function BrandPenguin() {
  return <img className={styles.brandPenguin} src={penguin} alt="ペンギン" />
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
        <BrandPenguin />
      </div>
    </div>
  )
}
