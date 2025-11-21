import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts, deletePost, togglePostPublish } from '../../store/postsSlice'
import { toast } from 'react-toastify'

const PostsList = () => {
  const dispatch = useDispatch()
  const { posts, loading, error, meta } = useSelector((state) => state.posts)
  const [search, setSearch] = useState('')
  const [publishedFilter, setPublishedFilter] = useState('')

  useEffect(() => {
    dispatch(fetchPosts({ search, published: publishedFilter || null }))
  }, [dispatch, search, publishedFilter])

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await dispatch(deletePost(id)).unwrap()
        toast.success('Post deleted successfully')
      } catch (error) {
        toast.error('Failed to delete post')
      }
    }
  }

  const handleTogglePublish = async (id) => {
    try {
      await dispatch(togglePostPublish(id)).unwrap()
      toast.success('Post status updated successfully')
    } catch (error) {
      toast.error('Failed to update post status')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading && posts.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '1.5rem 2rem', background: '#1e293b', minHeight: 'calc(100vh - 73px)' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: 0 }}>Posts</h1>
        <Link to="/posts/create" className="btn btn-primary" style={{ background: '#6366f1', border: 'none', fontWeight: '600' }}>
          Create New Post
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
                placeholder="Search posts..."
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
                <option value="">All Posts</option>
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

      {/* Posts Table */}
      <div className="card">
        <div className="card-body">
          {posts.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No posts found.</p>
              <Link to="/posts/create" className="btn btn-primary">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div>
                          <strong>{post.title}</strong>
                          <br />
                          <small className="text-muted">/{post.slug}</small>
                        </div>
                      </td>
                      <td>{post.author?.name}</td>
                      <td>
                        <span className={`badge ${post.published ? 'bg-success' : 'bg-warning'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>{formatDate(post.created_at)}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link
                            to={`/posts/${post.id}/edit`}
                            className="btn btn-outline-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className={`btn ${post.published ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleTogglePublish(post.id)}
                          >
                            {post.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(post.id, post.title)}
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
                  Showing {posts.length} of {meta.total} posts
                </small>
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    disabled={meta.current_page === 1}
                    onClick={() => dispatch(fetchPosts({ 
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
                    onClick={() => dispatch(fetchPosts({ 
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

export default PostsList