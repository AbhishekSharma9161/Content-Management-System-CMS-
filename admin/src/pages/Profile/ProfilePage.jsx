import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Save, Camera } from 'lucide-react'
import { updateProfile, updatePassword } from '../../store/authSlice'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { user, loading: authLoading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }))
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await dispatch(updateProfile({ 
        name: formData.name, 
        email: formData.email 
      })).unwrap()
      toast.success('Profile updated successfully! 🎉')
    } catch (error) {
      toast.error(error || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }
    
    setLoading(true)
    try {
      await dispatch(updatePassword({ 
        currentPassword: formData.currentPassword, 
        newPassword: formData.newPassword 
      })).unwrap()
      toast.success('Password changed successfully! 🔒')
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      toast.error(error || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '0.5rem' }}>
          Profile Settings
        </h1>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Manage your account information and security settings
        </p>

        <div className="row g-4">
          {/* Profile Information */}
          <div className="col-12 col-lg-8">
            <motion.div
              className="card"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="card-body p-4">
                <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: '1.5rem' }}>
                  Personal Information
                </h5>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Full Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.125rem', height: '1.125rem', color: '#9ca3af' }} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          paddingLeft: '2.75rem',
                          paddingTop: '0.625rem',
                          paddingBottom: '0.625rem',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb',
                          fontSize: '0.9375rem'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.125rem', height: '1.125rem', color: '#9ca3af' }} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          paddingLeft: '2.75rem',
                          paddingTop: '0.625rem',
                          paddingBottom: '0.625rem',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb',
                          fontSize: '0.9375rem'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: '500'
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-border spinner-border-sm" role="status" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save style={{ width: '1rem', height: '1rem' }} />
                        Save Changes
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Change Password */}
            <motion.div
              className="card mt-4"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="card-body p-4">
                <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: '1.5rem' }}>
                  Change Password
                </h5>
                
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-3">
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Current Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.125rem', height: '1.125rem', color: '#9ca3af' }} />
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          paddingLeft: '2.75rem',
                          paddingTop: '0.625rem',
                          paddingBottom: '0.625rem',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb',
                          fontSize: '0.9375rem'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.125rem', height: '1.125rem', color: '#9ca3af' }} />
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          paddingLeft: '2.75rem',
                          paddingTop: '0.625rem',
                          paddingBottom: '0.625rem',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb',
                          fontSize: '0.9375rem'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Confirm New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.125rem', height: '1.125rem', color: '#9ca3af' }} />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          paddingLeft: '2.75rem',
                          paddingTop: '0.625rem',
                          paddingBottom: '0.625rem',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb',
                          fontSize: '0.9375rem'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: '500'
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-border spinner-border-sm" role="status" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Lock style={{ width: '1rem', height: '1rem' }} />
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Profile Picture */}
          <div className="col-12 col-lg-4">
            <motion.div
              className="card"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="card-body p-4 text-center">
                <h5 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a202c', marginBottom: '1.5rem' }}>
                  Profile Picture
                </h5>
                
                <div 
                  style={{
                    width: '10rem',
                    height: '10rem',
                    margin: '0 auto 1.5rem',
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.4)',
                    position: 'relative'
                  }}
                >
                  <User style={{ width: '4rem', height: '4rem', color: 'white' }} />
                  <button
                    style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      right: '0.5rem',
                      width: '2.5rem',
                      height: '2.5rem',
                      background: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Camera style={{ width: '1.125rem', height: '1.125rem', color: '#a855f7' }} />
                  </button>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                  Upload a new profile picture
                </p>

                <button
                  className="btn btn-outline-primary w-100"
                  style={{
                    borderRadius: '0.75rem',
                    padding: '0.625rem',
                    fontWeight: '500'
                  }}
                >
                  Choose File
                </button>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              className="card mt-4"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="card-body p-4">
                <h5 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a202c', marginBottom: '1rem' }}>
                  Account Information
                </h5>
                
                <div style={{ fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280' }}>User ID</span>
                    <span style={{ fontWeight: '500', color: '#1f2937' }}>#{user?.id || '1'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#6b7280' }}>Role</span>
                    <span style={{ fontWeight: '500', color: '#1f2937' }}>Administrator</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Member Since</span>
                    <span style={{ fontWeight: '500', color: '#1f2937' }}>Jan 2024</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage
