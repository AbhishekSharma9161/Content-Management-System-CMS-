import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Bell, Lock, Globe, Palette, Save } from 'lucide-react'
import toast from 'react-hot-toast'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    twoFactorAuth: false,
    publicProfile: true,
    showEmail: false,
    language: 'en',
    timezone: 'UTC',
    theme: 'light'
  })

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    })
  }

  const handleSave = () => {
    toast.success('Settings saved successfully! ⚙️')
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '0.5rem' }}>
          Settings
        </h1>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Manage your application preferences and configurations
        </p>

        {/* Notifications */}
        <motion.div
          className="card mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <Bell style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7', marginRight: '0.75rem' }} />
              <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: 0 }}>
                Notifications
              </h5>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>Email Notifications</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>Receive email updates about your content</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>Push Notifications</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>Receive push notifications in your browser</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                  style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>Weekly Digest</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>Get a weekly summary of your activity</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.weeklyDigest}
                  onChange={() => handleToggle('weeklyDigest')}
                  style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          className="card mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <Lock style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7', marginRight: '0.75rem' }} />
              <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: 0 }}>
                Security
              </h5>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>Two-Factor Authentication</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>Add an extra layer of security to your account</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                  style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          className="card mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <Globe style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7', marginRight: '0.75rem' }} />
              <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: 0 }}>
                Privacy
              </h5>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>Public Profile</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>Make your profile visible to others</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.publicProfile}
                  onChange={() => handleToggle('publicProfile')}
                  style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>Show Email Address</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 0 }}>Display your email on your public profile</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle('showEmail')}
                  style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '500',
              fontSize: '1rem'
            }}
          >
            <Save style={{ width: '1.125rem', height: '1.125rem' }} />
            Save All Settings
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SettingsPage
