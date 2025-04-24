import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'

function LanguageWrapper () {
  return <App />
}

export default function AppRouter () {
  return (
    <BrowserRouter>
      <Routes>
        {/* R<Automatic redirection from '/' to '/es' */}
        <Route path='/' element={<Navigate to='/es' replace />} />

        {/* Routes per language */}
        <Route path='/:lang' element={<LanguageWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}
