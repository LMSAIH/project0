import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
