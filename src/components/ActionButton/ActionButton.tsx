import type { ButtonHTMLAttributes } from 'react'
import styles from './ActionButton.module.css'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export function ActionButton({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      className={`${styles.button} ${variant === 'primary' ? styles.primary : styles.secondary}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  )
}
