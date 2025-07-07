import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import LanguageRedirector from '@components/interface/LanguageRedirector'
import NotFound from '@components/interface/NotFound'
import TestEndScreen from '@dev/TestEndScreen'

export default function AppRouter () {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root: intelligent redirection based on localStorage/browser */}
        <Route path='/' element={<LanguageRedirector />} />

        {/* Direct language routes: render App with language from URL */}
        <Route path='/es' element={<App />} />
        <Route path='/gl' element={<App />} />

        {/* Development route */}
        {import.meta.env.MODE === 'development' && (
          <Route path='/test-end' element={<TestEndScreen />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
