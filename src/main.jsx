import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GarabatosByLily from './GarabatosByLily'
import NuevaPagina from './pages/NuevaPagina'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GarabatosByLily />} />
        <Route path="/nueva-pagina" element={<NuevaPagina />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
