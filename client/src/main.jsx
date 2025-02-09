import { BrowserRouter } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider strore={store}>
    <App />
    </Provider>
  </BrowserRouter>,
);
