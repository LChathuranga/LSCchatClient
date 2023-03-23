import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  )
}

export default App