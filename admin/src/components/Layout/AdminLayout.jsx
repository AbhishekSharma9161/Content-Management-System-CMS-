import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#1e293b' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: 0, position: 'relative', background: '#1e293b' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout