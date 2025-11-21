// Full Mock API with complete CRUD functionality
let mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password'
  }
]

let mockPosts = [
  {
    id: 1,
    title: 'Welcome to Our CMS',
    slug: 'welcome-to-our-cms',
    content: '<p>This is a sample blog post to demonstrate the CMS functionality. You can edit, delete, or create new posts!</p><p>The CMS supports rich text editing, media uploads, and much more.</p>',
    published: true,
    author: { id: 1, name: 'Admin User' },
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Getting Started with Laravel',
    slug: 'getting-started-with-laravel',
    content: '<p>Laravel is a powerful PHP framework that makes web development enjoyable and creative.</p><h2>Key Features</h2><ul><li>Elegant syntax</li><li>Powerful ORM (Eloquent)</li><li>Built-in testing support</li><li>Robust routing system</li></ul>',
    published: true,
    author: { id: 1, name: 'Admin User' },
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-14T09:15:00Z'
  },
  {
    id: 3,
    title: 'Draft Post Example',
    slug: 'draft-post-example',
    content: '<p>This is a draft post that is not yet published. You can edit it and publish when ready!</p>',
    published: false,
    author: { id: 1, name: 'Admin User' },
    created_at: '2024-01-13T16:45:00Z',
    updated_at: '2024-01-13T16:45:00Z'
  }
]

let mockPages = [
  {
    id: 1,
    title: 'About Us',
    slug: 'about-us',
    content: '<p>Welcome to our company! We are passionate about creating amazing web experiences.</p><h2>Our Mission</h2><p>Our mission is to provide high-quality web solutions that help businesses grow and succeed in the digital world.</p>',
    published: true,
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 2,
    title: 'Contact Us',
    slug: 'contact-us',
    content: '<p>Get in touch with us! We would love to hear from you.</p><h2>Contact Information</h2><ul><li><strong>Email:</strong> hello@example.com</li><li><strong>Phone:</strong> (555) 123-4567</li><li><strong>Address:</strong> 123 Main Street, City, State 12345</li></ul>',
    published: true,
    created_at: '2024-01-09T11:30:00Z',
    updated_at: '2024-01-09T11:30:00Z'
  },
  {
    id: 3,
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: '<p>This privacy policy explains how we collect, use, and protect your personal information.</p><h2>Information We Collect</h2><p>We collect information you provide directly to us, such as when you create an account or contact us.</p>',
    published: false,
    created_at: '2024-01-08T13:15:00Z',
    updated_at: '2024-01-08T13:15:00Z'
  }
]

let mockMedia = [
  {
    id: 1,
    filename: 'sample-image-1.jpg',
    original_name: 'beautiful-landscape.jpg',
    mime_type: 'image/jpeg',
    size: 245760,
    size_human: '240 KB',
    path: 'media/sample-image-1.jpg',
    url: 'https://picsum.photos/400/300?random=1',
    is_image: true,
    created_at: '2024-01-15T08:20:00Z',
    updated_at: '2024-01-15T08:20:00Z'
  },
  {
    id: 2,
    filename: 'sample-image-2.jpg',
    original_name: 'office-workspace.jpg',
    mime_type: 'image/jpeg',
    size: 189440,
    size_human: '185 KB',
    path: 'media/sample-image-2.jpg',
    url: 'https://picsum.photos/400/300?random=2',
    is_image: true,
    created_at: '2024-01-14T15:45:00Z',
    updated_at: '2024-01-14T15:45:00Z'
  },
  {
    id: 3,
    filename: 'document-1.pdf',
    original_name: 'company-brochure.pdf',
    mime_type: 'application/pdf',
    size: 1048576,
    size_human: '1 MB',
    path: 'media/document-1.pdf',
    url: '/media/document-1.pdf',
    is_image: false,
    created_at: '2024-01-13T10:30:00Z',
    updated_at: '2024-01-13T10:30:00Z'
  }
]

// Helper functions
const generateId = (array) => {
  return Math.max(...array.map(item => item.id), 0) + 1
}

const generateSlug = (title) => {
  return title.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

const paginate = (array, page = 1, perPage = 15) => {
  const start = (page - 1) * perPage
  const end = start + perPage
  const items = array.slice(start, end)
  
  return {
    data: items,
    meta: {
      current_page: page,
      last_page: Math.ceil(array.length / perPage),
      per_page: perPage,
      total: array.length
    }
  }
}

const filterItems = (items, search, publishedFilter) => {
  let filtered = [...items]
  
  if (search) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(search.toLowerCase()))
    )
  }
  
  if (publishedFilter !== null && publishedFilter !== '') {
    const isPublished = publishedFilter === 'true' || publishedFilter === true
    filtered = filtered.filter(item => item.published === isPublished)
  }
  
  return filtered
}

// Mock API implementation
export const mockApi = {
  // Auth endpoints
  login: async (email, password) => {
    await delay(1000)
    const user = mockUsers.find(u => u.email === email && u.password === password)
    if (user) {
      return {
        data: {
          user: { id: user.id, name: user.name, email: user.email },
          token: 'mock-token-' + Date.now()
        }
      }
    } else {
      throw { response: { data: { message: 'Invalid credentials' } } }
    }
  },

  register: async (name, email, password) => {
    await delay(1200)
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      throw { response: { data: { message: 'Email already exists' } } }
    }
    
    // Create new user
    const newUser = {
      id: generateId(mockUsers),
      name,
      email,
      password
    }
    mockUsers.push(newUser)
    
    return {
      data: {
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token: 'mock-token-' + Date.now()
      }
    }
  },

  logout: async () => {
    await delay(500)
    return { data: { message: 'Logged out successfully' } }
  },

  me: async () => {
    await delay(500)
    const currentUser = mockUsers.find(u => u.id === 1) || mockUsers[0]
    return {
      data: {
        user: { id: currentUser.id, name: currentUser.name, email: currentUser.email }
      }
    }
  },

  updateProfile: async (name, email) => {
    await delay(800)
    const userIndex = mockUsers.findIndex(u => u.id === 1)
    if (userIndex !== -1) {
      mockUsers[userIndex].name = name
      mockUsers[userIndex].email = email
      return {
        data: {
          user: { id: mockUsers[userIndex].id, name: mockUsers[userIndex].name, email: mockUsers[userIndex].email }
        }
      }
    }
    throw { response: { data: { message: 'User not found' } } }
  },

  updatePassword: async (currentPassword, newPassword) => {
    await delay(800)
    const user = mockUsers.find(u => u.id === 1)
    if (user && user.password === currentPassword) {
      user.password = newPassword
      return {
        data: {
          message: 'Password updated successfully'
        }
      }
    }
    throw { response: { data: { message: 'Current password is incorrect' } } }
  },

  // Posts endpoints
  getPosts: async ({ page = 1, search = '', published = null } = {}) => {
    await delay(800)
    const filtered = filterItems(mockPosts, search, published)
    return { data: paginate(filtered, page, 15) }
  },

  getPost: async (id) => {
    await delay(600)
    const post = mockPosts.find(p => p.id === parseInt(id))
    if (!post) {
      throw { response: { data: { message: 'Post not found' } } }
    }
    return { data: { data: post } }
  },

  createPost: async (postData) => {
    await delay(1000)
    const newPost = {
      id: generateId(mockPosts),
      title: postData.title,
      slug: postData.slug || generateSlug(postData.title),
      content: postData.content || '',
      published: postData.published || false,
      author: { id: 1, name: 'Admin User' },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    mockPosts.unshift(newPost)
    return { data: { data: newPost, message: 'Post created successfully' } }
  },

  updatePost: async (id, postData) => {
    await delay(1000)
    const index = mockPosts.findIndex(p => p.id === parseInt(id))
    if (index === -1) {
      throw { response: { data: { message: 'Post not found' } } }
    }
    
    mockPosts[index] = {
      ...mockPosts[index],
      ...postData,
      slug: postData.slug || generateSlug(postData.title || mockPosts[index].title),
      updated_at: new Date().toISOString()
    }
    
    return { data: { data: mockPosts[index], message: 'Post updated successfully' } }
  },

  deletePost: async (id) => {
    await delay(800)
    const index = mockPosts.findIndex(p => p.id === parseInt(id))
    if (index === -1) {
      throw { response: { data: { message: 'Post not found' } } }
    }
    mockPosts.splice(index, 1)
    return { data: { message: 'Post deleted successfully' } }
  },

  togglePostPublish: async (id) => {
    await delay(600)
    const index = mockPosts.findIndex(p => p.id === parseInt(id))
    if (index === -1) {
      throw { response: { data: { message: 'Post not found' } } }
    }
    
    mockPosts[index].published = !mockPosts[index].published
    mockPosts[index].updated_at = new Date().toISOString()
    
    const message = mockPosts[index].published ? 'Post published successfully' : 'Post unpublished successfully'
    return { data: { data: mockPosts[index], message } }
  },

  // Pages endpoints
  getPages: async ({ page = 1, search = '', published = null } = {}) => {
    await delay(800)
    const filtered = filterItems(mockPages, search, published)
    return { data: paginate(filtered, page, 15) }
  },

  getPage: async (id) => {
    await delay(600)
    const page = mockPages.find(p => p.id === parseInt(id))
    if (!page) {
      throw { response: { data: { message: 'Page not found' } } }
    }
    return { data: { data: page } }
  },

  createPage: async (pageData) => {
    await delay(1000)
    const newPage = {
      id: generateId(mockPages),
      title: pageData.title,
      slug: pageData.slug || generateSlug(pageData.title),
      content: pageData.content || '',
      published: pageData.published || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    mockPages.unshift(newPage)
    return { data: { data: newPage, message: 'Page created successfully' } }
  },

  updatePage: async (id, pageData) => {
    await delay(1000)
    const index = mockPages.findIndex(p => p.id === parseInt(id))
    if (index === -1) {
      throw { response: { data: { message: 'Page not found' } } }
    }
    
    mockPages[index] = {
      ...mockPages[index],
      ...pageData,
      slug: pageData.slug || generateSlug(pageData.title || mockPages[index].title),
      updated_at: new Date().toISOString()
    }
    
    return { data: { data: mockPages[index], message: 'Page updated successfully' } }
  },

  deletePage: async (id) => {
    await delay(800)
    const index = mockPages.findIndex(p => p.id === parseInt(id))
    if (index === -1) {
      throw { response: { data: { message: 'Page not found' } } }
    }
    mockPages.splice(index, 1)
    return { data: { message: 'Page deleted successfully' } }
  },

  // Media endpoints
  getMedia: async ({ page = 1, search = '', type = null } = {}) => {
    await delay(800)
    let filtered = [...mockMedia]
    
    if (search) {
      filtered = filtered.filter(item => 
        item.original_name.toLowerCase().includes(search.toLowerCase()) ||
        item.filename.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (type) {
      if (type === 'image') {
        filtered = filtered.filter(item => item.is_image)
      } else if (type === 'document') {
        filtered = filtered.filter(item => !item.is_image)
      }
    }
    
    return { data: paginate(filtered, page, 20) }
  },

  uploadMedia: async (file) => {
    await delay(2000) // Simulate upload time
    
    const isImage = file.type.startsWith('image/')
    const newMedia = {
      id: generateId(mockMedia),
      filename: `uploaded-${Date.now()}-${file.name}`,
      original_name: file.name,
      mime_type: file.type,
      size: file.size,
      size_human: formatBytes(file.size),
      path: `media/uploaded-${Date.now()}-${file.name}`,
      url: isImage ? URL.createObjectURL(file) : `/media/uploaded-${Date.now()}-${file.name}`,
      is_image: isImage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    mockMedia.unshift(newMedia)
    return { data: { data: newMedia, message: 'File uploaded successfully' } }
  },

  deleteMedia: async (id) => {
    await delay(800)
    const index = mockMedia.findIndex(m => m.id === parseInt(id))
    if (index === -1) {
      throw { response: { data: { message: 'Media not found' } } }
    }
    mockMedia.splice(index, 1)
    return { data: { message: 'Media deleted successfully' } }
  },

  // Dashboard stats
  getStats: async () => {
    await delay(600)
    return {
      data: {
        posts: {
          total: mockPosts.length,
          published: mockPosts.filter(p => p.published).length,
          draft: mockPosts.filter(p => !p.published).length
        },
        pages: {
          total: mockPages.length,
          published: mockPages.filter(p => p.published).length,
          draft: mockPages.filter(p => !p.published).length
        },
        media: {
          total: mockMedia.length
        }
      }
    }
  }
}

// Helper function for file size formatting
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Check if we should use mock API
export const shouldUseMockApi = () => {
  return process.env.NODE_ENV === 'development'
}