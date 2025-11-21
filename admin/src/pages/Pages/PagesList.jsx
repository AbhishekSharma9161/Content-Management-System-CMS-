import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPages, deletePage } from '../../store/pagesSlice'
import { toast } from 'react-toastify'

const PagesList = () => {
  const dispatch = useDispatch()
  const { pages, loading, error, meta } = useSelector((state) => state.pages)
  const [search, setSearch] = useState('')
  const [publishedFilter, setPublishedFilter] = useState('')

  useEffect(() => {
    dispatch(fetchPages({ search, published: publishedFilter || null }))
  }, [dispatch, search, publishedFilter])

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await dispatch(deletePage(id)).unwrap()
        toast.success('Page deleted successfully')
      } catch (error) {
        toast.error('Failed to delete page')
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading && pages.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Pages</h1>
        <Link to="/pages/create" className="btn btn-primary">
          Create New Page
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search pages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
              >
                <option value="">All Pages</option>
                <option value="true">Published</option>
                <option value="false">Drafts</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Pages Table */}
      <div className="card">
        <div className="card-body">
          {pages.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No pages found.</p>
              <Link to="/pages/create" className="btn btn-primary">
                Create Your First Page
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td>
                        <div>
                          <strong>{page.title}</strong>
                          <br />
                          <small className="text-muted">/{page.slug}</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${page.published ? 'bg-success' : 'bg-warning'}`}>
                          {page.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>{formatDate(page.created_at)}</td>
                      <td>{formatDate(page.updated_at)}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link
                            to={`/pages/${page.id}/edit`}
                            className="btn btn-outline-primary"
                          >
                            Edit
                          </Link>
                          {page.published && (
                            <button
                              className="btn btn-outline-info"
                              onClick={() => window.open(`/${page.slug}`, '_blank')}
                            >
                              View
                            </button>
                          )}
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(page.id, page.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {meta.last_page > 1 && (
            <nav className="mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Showing {pages.length} of {meta.total} pages
                </small>
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    disabled={meta.current_page === 1}
                    onClick={() => dispatch(fetchPages({ 
                      page: meta.current_page - 1, 
                      search, 
                      published: publishedFilter || null 
                    }))}
                  >
                    Previous
                  </button>
                  <span className="me-2">
                    Page {meta.current_page} of {meta.last_page}
                  </span>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={meta.current_page === meta.last_page}
                    onClick={() => dispatch(fetchPages({ 
                      page: meta.current_page + 1, 
                      search, 
                      published: publishedFilter || null 
                    }))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

export default PagesList