import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import './assets/styles/reset.css'

import './i18n/i18n.tsx'
import './setupAxios.tsx'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Provider } from 'react-redux'
import { store } from './store/store.tsx'
import { theme } from './assets/styles/theme.tsx'
import App from './app/App.tsx'
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_URL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
