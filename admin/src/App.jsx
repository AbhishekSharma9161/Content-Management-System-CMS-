import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { checkAuth } from './store/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/Layout/AdminLayout'
import Landing from './pages/Landing'
import AuthPage from './pages/Auth/AuthPage'
import Dashboard from './pages/Dashboard'
import PostsList from './pages/Posts/PostsList'
import CreatePost from './pages/Posts/CreatePost'
import EditPost from './pages/Posts/EditPost'
import PagesList from './pages/Pages/PagesList'
import CreatePage from './pages/Pages/CreatePage'
import EditPage from './pages/Pages/EditPage'
import MediaManager from './pages/Media/MediaManager'
import ProfilePage from './pages/Profile/ProfilePage'
import SettingsPage from './pages/Settings/SettingsPage'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    // Apply dark mode class on mount
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [darkMode])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />
        } />
        
        <Route path="/auth" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Posts Routes */}
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          
          {/* Pages Routes */}
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/create" element={<CreatePage />} />
          <Route path="pages/:id/edit" element={<EditPage />} />
          
          {/* Media Routes */}
          <Route path="media" element={<MediaManager />} />
          
          {/* Profile & Settings Routes */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/posts" element={<Navigate to="/admin/posts" replace />} />
        <Route path="/pages" element={<Navigate to="/admin/pages" replace />} />
        <Route path="/media" element={<Navigate to="/admin/media" replace />} />
        <Route path="/profile" element={<Navigate to="/admin/profile" replace />} />
        <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </>
  )
}

export default App