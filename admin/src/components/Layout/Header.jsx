import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { logout } from '../../store/authSlice'
import { 
  Search, 
  User, 
  LogOut, 
  Settings,
  ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      toast.success('Logged out successfully! 👋')
      navigate('/auth')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`)
    }
  }

  return (
    <motion.header 
      style={{
        background: '#1e293b',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #334155',
        padding: '1rem 2rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '28rem' }}>
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <Search 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#6b7280', 
                width: '1.125rem', 
                height: '1.125rem',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              placeholder="Search posts, pages, media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '2.75rem',
                paddingRight: '1rem',
                paddingTop: '0.625rem',
                paddingBottom: '0.625rem',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                color: '#1f2937'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7'
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'
                e.target.style.background = '#ffffff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
                e.target.style.background = '#f9fafb'
              }}
            />
          </form>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1.5rem' }}>
          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.75rem',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              whileHover={{ scale: 1.02, background: '#f3f4f6' }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  borderRadius: '0.625rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px -1px rgba(168, 85, 247, 0.3)'
                }}
              >
                <User style={{ width: '1.125rem', height: '1.125rem', color: 'white' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.125rem', lineHeight: 1 }}>
                  {user?.name || 'Admin User'}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: 0, lineHeight: 1 }}>
                  Administrator
                </p>
              </div>
              <ChevronDown 
                style={{ 
                  width: '1rem', 
                  height: '1rem', 
                  color: '#9ca3af', 
                  transition: 'transform 0.2s',
                  transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                }} 
              />
            </motion.button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: '0.5rem',
                      width: '16rem',
                      background: 'white',
                      borderRadius: '0.875rem',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      border: '1px solid #e5e7eb',
                      padding: '0.5rem',
                      zIndex: 50
                    }}
                  >
                    {/* User Info Header */}
                    <div 
                      style={{
                        padding: '0.875rem 1rem',
                        borderBottom: '1px solid #f3f4f6',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div 
                          style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                            borderRadius: '0.625rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '0.75rem'
                          }}
                        >
                          <User style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                        </div>
                        <div>
                          <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.125rem' }}>
                            {user?.name || 'Admin User'}
                          </p>
                          <p style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: 0 }}>
                            {user?.email || 'admin@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <button 
                      onClick={() => {
                        setShowUserMenu(false)
                        navigate('/profile')
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.625rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        textAlign: 'left',
                        marginBottom: '0.25rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f9fafb'
                        e.currentTarget.style.color = '#a855f7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#374151'
                      }}
                    >
                      <User style={{ width: '1.125rem', height: '1.125rem', marginRight: '0.75rem' }} />
                      Edit Profile
                    </button>
                    
                    <button 
                      onClick={() => {
                        setShowUserMenu(false)
                        navigate('/settings')
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.625rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        textAlign: 'left',
                        marginBottom: '0.25rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f9fafb'
                        e.currentTarget.style.color = '#a855f7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#374151'
                      }}
                    >
                      <Settings style={{ width: '1.125rem', height: '1.125rem', marginRight: '0.75rem' }} />
                      Settings
                    </button>
                    
                    <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />
                    
                    <button 
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.625rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#dc2626',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fef2f2'
                        e.currentTarget.style.color = '#dc2626'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#dc2626'
                      }}
                    >
                      <LogOut style={{ width: '1.125rem', height: '1.125rem', marginRight: '0.75rem' }} />
                      Sign Out
                    </button>
                  </motion.div>
                  
                  {/* Backdrop */}
                  <div 
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 40
                    }}
                    onClick={() => setShowUserMenu(false)}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
