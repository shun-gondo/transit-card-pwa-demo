import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import { HistoryPage } from './pages/HistoryPage/HistoryPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}
