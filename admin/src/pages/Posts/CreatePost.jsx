import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { createPost } from '../../store/postsSlice'
import { toast } from 'react-toastify'

const CreatePost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      published: false
    }
  })

  const watchTitle = watch('title')

  // Auto-generate slug from title
  React.useEffect(() => {
    if (watchTitle) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
      setValue('slug', slug)
    }
  }, [watchTitle, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const postData = {
        ...data,
        content: content
      }
      
      await dispatch(createPost(postData)).unwrap()
      toast.success('Post created successfully!')
      navigate('/posts')
    } catch (error) {
      toast.error(error || 'Failed to create post')
    } finally {
      setLoading(false)
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create New Post</h1>
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
                    URL-friendly version of the title. Auto-generated from title.
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
                    Publish immediately
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      'Create Post'
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
              <h5 className="card-title mb-0">Publishing</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Choose whether to publish this post immediately or save it as a draft.
              </p>
              <ul className="list-unstyled">
                <li><strong>Published:</strong> Visible to website visitors</li>
                <li><strong>Draft:</strong> Only visible in admin panel</li>
              </ul>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">SEO Tips</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>• Keep titles under 60 characters</li>
                <li>• Use descriptive, keyword-rich titles</li>
                <li>• Make slugs short and readable</li>
                <li>• Include relevant headings in content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost