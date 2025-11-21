import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  File, 
  Image, 
  Sparkles,
  TrendingUp,
  Users,
  Menu,
  X
} from 'lucide-react'

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuItems = [
    { 
      to: '/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      bgLight: 'rgba(59, 130, 246, 0.2)'
    },
    { 
      to: '/posts', 
      icon: FileText, 
      label: 'Posts', 
      gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
      bgLight: 'rgba(34, 197, 94, 0.2)'
    },
    { 
      to: '/pages', 
      icon: File, 
      label: 'Pages', 
      gradient: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
      bgLight: 'rgba(168, 85, 247, 0.2)'
    },
    { 
      to: '/media', 
      icon: Image, 
      label: 'Media', 
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      bgLight: 'rgba(236, 72, 153, 0.2)'
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          display: 'none'
        }}
        className="mobile-menu-btn"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
              display: 'none'
            }}
            className="mobile-overlay"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        style={{
          width: '280px',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
          color: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 999
        }}
        className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <motion.div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '2rem' 
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              borderRadius: '0.75rem',
              marginRight: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.4)'
            }}
          >
            <Sparkles style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: 'white',
              marginBottom: '0.125rem'
            }}>
              ContentCraft
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e0', marginBottom: 0 }}>
              Admin Panel
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <NavLink 
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: isActive ? 'white' : '#cbd5e0',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                  boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.2)' : 'none'
                })}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: item.bgLight,
                          borderRadius: '0.75rem',
                          zIndex: 0
                        }}
                      />
                    )}
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        marginRight: '0.75rem',
                        transition: 'all 0.3s ease',
                        background: isActive ? item.gradient : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none',
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      <item.icon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                    </div>
                    <span style={{ 
                      fontWeight: '500', 
                      fontSize: '0.9375rem',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        style={{
                          marginLeft: 'auto',
                          width: '0.5rem',
                          height: '0.5rem',
                          background: 'white',
                          borderRadius: '9999px',
                          position: 'relative',
                          zIndex: 1
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Spacer to push bottom cards down */}
        <div style={{ flex: 1 }} />

        {/* Stats Card */}
        <motion.div
          style={{
            marginTop: 'auto',
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#a78bfa', marginRight: '0.5rem' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#e2e8f0' }}>Quick Stats</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>Total Posts</span>
              <span style={{ color: 'white', fontWeight: '500' }}>12</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>Published</span>
              <span style={{ color: '#4ade80', fontWeight: '500' }}>8</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Drafts</span>
              <span style={{ color: '#facc15', fontWeight: '500' }}>4</span>
            </div>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div 
              style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem'
              }}
            >
              <Users style={{ width: '1rem', height: '1rem', color: 'white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white', marginBottom: '0.125rem' }}>
                Admin User
              </p>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e0', marginBottom: 0 }}>
                Administrator
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </>
  )
}

export default Sidebar
