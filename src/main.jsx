import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// O HTML já vem pré-renderizado no build (bom p/ SEO/LLMs): só "hidrata". Em dev está vazio.
// Analytics, âncoras e efeitos de rolagem são iniciados por App.jsx (useEffect), após a montagem.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
