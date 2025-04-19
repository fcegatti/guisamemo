import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import App from './App'
import { useLanguage } from '@context/LanguageContext'

function LanguageWrapper () {
  const { lang } = useParams()
  const { setLang } = useLanguage()

  useEffect(() => {
    // Change context language if valid
    if (['es', 'gl'].includes(lang)) {
      setLang(lang)
    }
  }, [lang, setLang])

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
