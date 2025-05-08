import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import LanguageRedirector from '@components/LanguageRedirector'

function LanguageWrapper () {
  return <App />
}

export default function AppRouter () {
  return (
    <BrowserRouter>
      <Routes>
        {/* R<Automatic redirection from '/' to '/es' */}
        <Route path='/' element={<LanguageRedirector />} />

        {/* Routes per language */}
        <Route path='/:lang' element={<LanguageWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}
