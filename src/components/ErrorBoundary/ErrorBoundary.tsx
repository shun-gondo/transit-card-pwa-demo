import { Component, type ErrorInfo, type ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error in Transit Pass Demo:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div>
            <p className={styles.title}>問題が発生しました</p>
            <p className={styles.description}>
              画面の表示中にエラーが発生しました。再読み込みをお試しください。
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={() => window.location.reload()}
            >
              再読み込み
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
