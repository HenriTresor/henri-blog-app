import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
