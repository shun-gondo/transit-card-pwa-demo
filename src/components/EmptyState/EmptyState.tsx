import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  description?: string
  variant?: 'empty' | 'error'
}

export function EmptyState({ title, description, variant = 'empty' }: EmptyStateProps) {
  return (
    <div className={styles.wrapper} role={variant === 'error' ? 'alert' : 'status'}>
      <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true">
        {variant === 'error' ? (
          <>
            <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M24 15v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="32" r="1.6" fill="currentColor" />
          </>
        ) : (
          <>
            <rect
              x="10"
              y="16"
              width="28"
              height="20"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path d="M10 22h28" stroke="currentColor" strokeWidth="2.5" />
          </>
        )}
      </svg>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
