import type { ReactNode } from 'react'
import { Header } from '../Header/Header'
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
