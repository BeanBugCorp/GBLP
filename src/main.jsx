import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GarabatosByLily from './GarabatosByLily'
import FAQ from './pages/FAQ'
import Services from './pages/Services'
import Collabs from './pages/Collabs'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GarabatosByLily />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/colaboraciones" element={<Collabs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
