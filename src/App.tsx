import { CardProvider } from './context/CardContext'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { AppRouter } from './router'

function App() {
  return (
    <ErrorBoundary>
      <CardProvider>
        <AppRouter />
      </CardProvider>
    </ErrorBoundary>
  )
}

export default App
