import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, File, Image, TrendingUp, Plus } from 'lucide-react'
import api from '../services/api'
import { mockApi, shouldUseMockApi } from '../services/mockApi'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let response
        if (shouldUseMockApi()) {
          response = await mockApi.getStats()
        } else {
          response = await api.get('/api/dashboard/stats')
        }
        setStats(response.data)
      } catch (error) {
        toast.error('Failed to load dashboard stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border" style={{ color: '#a3e635' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#1e293b', height: 'calc(100vh - 73px)', padding: '1rem', margin: 0, overflow: 'hidden', position: 'relative' }}>
      {/* Gradient Wrapper */}
      <div className="gradient-wrapper">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2 gap-2" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.125rem' }}>
            Dashboard
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: 0, fontSize: '0.8125rem' }}>
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <Link
          to="/admin/posts/create"
          className="d-flex align-items-center text-decoration-none"
          style={{ 
            borderRadius: '0.5rem', 
            padding: '0.625rem 1.25rem',
            background: '#a3e635',
            color: '#0f172a',
            fontWeight: '600',
            fontSize: '0.875rem',
            boxShadow: '0 2px 8px rgba(163, 230, 53, 0.3)'
          }}
        >
          <Plus style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.5rem' }} />
          <span>Create new</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 mb-2" style={{ position: 'relative', zIndex: 1 }}>
        <div className="col-6 col-md-3">
          <div style={{ background: '#2d3748', borderRadius: '0.625rem', padding: '0.875rem', border: '1px solid #374151' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <FileText style={{ width: '1.125rem', height: '1.125rem', color: '#94a3b8' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{stats?.posts?.total || 0}</span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginBottom: '0.125rem' }}>Total Posts</div>
            <div style={{ fontSize: '0.5625rem', color: '#64748b' }}>{stats?.posts?.published || 0} published, {stats?.posts?.draft || 0} drafts</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div style={{ background: '#2d3748', borderRadius: '0.625rem', padding: '0.875rem', border: '1px solid #374151' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <File style={{ width: '1.125rem', height: '1.125rem', color: '#94a3b8' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{stats?.pages?.total || 0}</span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginBottom: '0.125rem' }}>Total Pages</div>
            <div style={{ fontSize: '0.5625rem', color: '#64748b' }}>{stats?.pages?.published || 0} published, {stats?.pages?.draft || 0} drafts</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div style={{ background: '#2d3748', borderRadius: '0.625rem', padding: '0.875rem', border: '1px solid #374151' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <Image style={{ width: '1.125rem', height: '1.125rem', color: '#94a3b8' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{stats?.media?.total || 0}</span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginBottom: '0.125rem' }}>Media Files</div>
            <div style={{ fontSize: '0.5625rem', color: '#64748b' }}>Images, documents, and more</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div style={{ background: '#2d3748', borderRadius: '0.625rem', padding: '0.875rem', border: '1px solid #374151' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <TrendingUp style={{ width: '1.125rem', height: '1.125rem', color: '#94a3b8' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{(stats?.posts?.published || 0) + (stats?.pages?.published || 0)}</span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginBottom: '0.125rem' }}>Published Content</div>
            <div style={{ fontSize: '0.5625rem', color: '#64748b' }}>Live on your website</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row g-2" style={{ position: 'relative', zIndex: 1 }}>
        {/* Quick Actions */}
        <div className="col-12 col-lg-5">
          <div style={{ background: '#2d3748', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', height: '100%' }}>
            <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
              Quick Actions
            </h5>
            <div className="d-grid gap-2">
              <Link
                to="/admin/posts/create"
                className="text-decoration-none"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.875rem',
                  background: '#374151',
                  borderRadius: '0.5rem',
                  border: '1px solid #4b5563'
                }}
              >
                <FileText style={{ width: '1.125rem', height: '1.125rem', color: '#94a3b8', marginRight: '0.75rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#ffffff', fontSize: '0.875rem' }}>Create New Post</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Write and publish blog content</div>
                </div>
              </Link>

              <Link
                to="/admin/pages/create"
                className="text-decoration-none"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.875rem',
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  borderRadius: '0.5rem'
                }}
              >
                <File style={{ width: '1.125rem', height: '1.125rem', color: '#065f46', marginRight: '0.75rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#065f46', fontSize: '0.875rem' }}>Create New Page</div>
                  <div style={{ fontSize: '0.75rem', color: '#047857' }}>Add static pages to your site</div>
                </div>
              </Link>

              <Link
                to="/admin/media"
                className="text-decoration-none"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.875rem',
                  background: 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)',
                  borderRadius: '0.5rem'
                }}
              >
                <Image style={{ width: '1.125rem', height: '1.125rem', color: '#581c87', marginRight: '0.75rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#581c87', fontSize: '0.875rem' }}>Manage Media</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b21a8' }}>Upload and organize files</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Overview */}
        <div className="col-12 col-lg-7">
          <div style={{ background: '#e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', height: '100%' }}>
            <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
              Content Overview
            </h5>
            <div className="row g-3">
              <div className="col-6">
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Blog Posts</div>
                  <div className="d-flex align-items-center justify-content-between p-2" style={{ background: '#d1fae5', borderRadius: '0.375rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#065f46' }}>Published</span>
                    <span style={{ padding: '0.125rem 0.5rem', background: '#10b981', color: 'white', fontSize: '0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                      {stats?.posts?.published || 0}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2" style={{ background: '#fef3c7', borderRadius: '0.375rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#78350f' }}>Drafts</span>
                    <span style={{ padding: '0.125rem 0.5rem', background: '#f59e0b', color: 'white', fontSize: '0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                      {stats?.posts?.draft || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>Static Pages</div>
                  <div className="d-flex align-items-center justify-content-between p-2" style={{ background: '#d1fae5', borderRadius: '0.375rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#065f46' }}>Published</span>
                    <span style={{ padding: '0.125rem 0.5rem', background: '#10b981', color: 'white', fontSize: '0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                      {stats?.pages?.published || 0}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2" style={{ background: '#fef3c7', borderRadius: '0.375rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#78350f' }}>Drafts</span>
                    <span style={{ padding: '0.125rem 0.5rem', background: '#f59e0b', color: 'white', fontSize: '0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                      {stats?.pages?.draft || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between p-3 mt-3" style={{ background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)', borderRadius: '0.5rem' }}>
              <div className="d-flex align-items-center">
                <Image style={{ width: '1rem', height: '1rem', color: '#5b21b6', marginRight: '0.5rem' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#5b21b6' }}>Total Media Files</span>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', background: '#7c3aed', color: 'white', fontSize: '0.875rem', borderRadius: '9999px', fontWeight: '600' }}>
                {stats?.media?.total || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
