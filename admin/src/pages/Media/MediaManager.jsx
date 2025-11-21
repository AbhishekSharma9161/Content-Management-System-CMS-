import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMedia, uploadMedia, deleteMedia } from '../../store/mediaSlice'
import { toast } from 'react-toastify'

const MediaManager = () => {
  const dispatch = useDispatch()
  const { media, loading, uploading, error, meta } = useSelector((state) => state.media)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    dispatch(fetchMedia({ search, type: typeFilter || null }))
  }, [dispatch, search, typeFilter])

  const handleFileSelect = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }
      
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ]
      
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File type ${file.type} is not allowed.`)
        return
      }
      
      dispatch(uploadMedia(file))
        .unwrap()
        .then(() => {
          toast.success(`${file.name} uploaded successfully!`)
        })
        .catch((error) => {
          toast.error(`Failed to upload ${file.name}: ${error}`)
        })
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const handleDelete = async (id, filename) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      try {
        await dispatch(deleteMedia(id)).unwrap()
        toast.success('File deleted successfully')
      } catch (error) {
        toast.error('Failed to delete file')
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

  const getFileIcon = (mimeType) => {
    if (mimeType.startsWith('image/')) return '🖼️'
    if (mimeType === 'application/pdf') return '📄'
    if (mimeType.includes('word')) return '📝'
    if (mimeType === 'text/plain') return '📄'
    return '📁'
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Media Manager</h1>
        <button 
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Uploading...
            </>
          ) : (
            'Upload Files'
          )}
        </button>
      </div>

      {/* Upload Area */}
      <div 
        className={`card mb-4 ${dragOver ? 'border-primary bg-light' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="card-body text-center py-5">
          <div className="mb-3">
            <i className="fas fa-cloud-upload-alt fa-3x text-muted"></i>
          </div>
          <h5>Drag & Drop Files Here</h5>
          <p className="text-muted">
            Or click the "Upload Files" button above. 
            <br />
            Supported formats: JPEG, PNG, GIF, WebP, SVG, PDF, DOC, DOCX, TXT
            <br />
            Maximum file size: 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Files</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="text-muted">
                Total: {meta.total} files
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Media Grid */}
      <div className="card">
        <div className="card-body">
          {loading && media.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3">
                <i className="fas fa-images fa-3x text-muted"></i>
              </div>
              <h5>No files found</h5>
              <p className="text-muted">Upload your first file to get started.</p>
            </div>
          ) : (
            <>
              <div className="media-grid">
                {media.map((item) => (
                  <div key={item.id} className="media-item">
                    <div className="position-relative">
                      {item.is_image ? (
                        <img 
                          src={item.url} 
                          alt={item.original_name}
                          className="img-fluid"
                          style={{ height: '120px', objectFit: 'cover', width: '100%' }}
                        />
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '120px' }}>
                          <div className="file-icon">{getFileIcon(item.mime_type)}</div>
                        </div>
                      )}
                      
                      <button
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                        onClick={() => handleDelete(item.id, item.original_name)}
                        style={{ fontSize: '0.7rem' }}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <div className="fw-bold text-truncate" title={item.original_name}>
                        {item.original_name}
                      </div>
                      <small className="text-muted d-block">
                        {item.size_human}
                      </small>
                      <small className="text-muted d-block">
                        {formatDate(item.created_at)}
                      </small>
                      {item.is_image && (
                        <button
                          className="btn btn-outline-primary btn-sm mt-1 w-100"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url)
                            toast.success('Image URL copied to clipboard!')
                          }}
                        >
                          Copy URL
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {meta.last_page > 1 && (
                <nav className="mt-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Showing {media.length} of {meta.total} files
                    </small>
                    <div>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        disabled={meta.current_page === 1}
                        onClick={() => dispatch(fetchMedia({ 
                          page: meta.current_page - 1, 
                          search, 
                          type: typeFilter || null 
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
                        onClick={() => dispatch(fetchMedia({ 
                          page: meta.current_page + 1, 
                          search, 
                          type: typeFilter || null 
                        }))}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MediaManager