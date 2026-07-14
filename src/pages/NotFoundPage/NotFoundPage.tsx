import { Link } from 'react-router-dom'
import { AppLayout } from '../../components/AppLayout/AppLayout'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <AppLayout>
      <div className={styles.wrapper}>
        <p className={styles.title}>ページが見つかりません</p>
        <p className={styles.description}>
          指定されたURLは存在しないか、移動した可能性があります。
        </p>
        <Link to="/" className={styles.link}>
          ホームへ戻る
        </Link>
      </div>
    </AppLayout>
  )
}
