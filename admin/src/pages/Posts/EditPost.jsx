import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { fetchPost, updatePost, clearCurrentPost } from '../../store/postsSlice'
import { toast } from 'react-toastify'

const EditPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentPost, loading } = useSelector((state) => state.posts)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState('')
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm()

  const watchTitle = watch('title')

  useEffect(() => {
    dispatch(fetchPost(id))
    
    return () => {
      dispatch(clearCurrentPost())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (currentPost) {
      reset({
        title: currentPost.title,
        slug: currentPost.slug,
        published: currentPost.published
      })
      setContent(currentPost.content || '')
    }
  }, [currentPost, reset])

  // Auto-generate slug from title
  React.useEffect(() => {
    if (watchTitle && currentPost) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
      setValue('slug', slug)
    }
  }, [watchTitle, setValue, currentPost])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const postData = {
        ...data,
        content: content
      }
      
      await dispatch(updatePost({ id: parseInt(id), data: postData })).unwrap()
      toast.success('Post updated successfully!')
      navigate('/posts')
    } catch (error) {
      toast.error(error || 'Failed to update post')
    } finally {
      setSaving(false)
    }
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="alert alert-danger">
        Post not found.
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Post: {currentPost.title}</h1>
        <Link to="/posts" className="btn btn-secondary">
          Back to Posts
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    {...register('title', { 
                      required: 'Title is required',
                      minLength: {
                        value: 3,
                        message: 'Title must be at least 3 characters'
                      }
                    })}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">Slug *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                    id="slug"
                    {...register('slug', { 
                      required: 'Slug is required',
                      pattern: {
                        value: /^[a-z0-9-]+$/,
                        message: 'Slug can only contain lowercase letters, numbers, and hyphens'
                      }
                    })}
                  />
                  {errors.slug && (
                    <div className="invalid-feedback">
                      {errors.slug.message}
                    </div>
                  )}
                  <div className="form-text">
                    URL-friendly version of the title.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    style={{ height: '300px', marginBottom: '50px' }}
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="published"
                    {...register('published')}
                  />
                  <label className="form-check-label" htmlFor="published">
                    Published
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      'Update Post'
                    )}
                  </button>
                  <Link to="/posts" className="btn btn-secondary">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Post Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Created:</strong> {new Date(currentPost.created_at).toLocaleDateString()}</p>
              <p><strong>Updated:</strong> {new Date(currentPost.updated_at).toLocaleDateString()}</p>
              <p><strong>Author:</strong> {currentPost.author?.name}</p>
              <p><strong>Status:</strong> 
                <span className={`badge ms-2 ${currentPost.published ? 'bg-success' : 'bg-warning'}`}>
                  {currentPost.published ? 'Published' : 'Draft'}
                </span>
              </p>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => window.open(`/blog/${currentPost.slug}`, '_blank')}
                >
                  Preview Post
                </button>
                <Link 
                  to="/posts" 
                  className="btn btn-outline-secondary btn-sm"
                >
                  View All Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost