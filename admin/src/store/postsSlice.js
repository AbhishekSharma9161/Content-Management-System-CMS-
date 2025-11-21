import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'
import { mockApi, shouldUseMockApi } from '../services/mockApi'

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page = 1, search = '', published = null } = {}, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.getPosts()
      } else {
        const params = new URLSearchParams({ page })
        if (search) params.append('search', search)
        if (published !== null) params.append('published', published)
        
        response = await api.get(`/api/posts?${params}`)
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts')
    }
  }
)

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.getPost(id)
      } else {
        response = await api.get(`/api/posts/${id}`)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch post')
    }
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.createPost(postData)
      } else {
        response = await api.post('/api/posts', postData)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post')
    }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.updatePost(id, data)
      } else {
        response = await api.put(`/api/posts/${id}`, data)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post')
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      if (shouldUseMockApi()) {
        await mockApi.deletePost(id)
      } else {
        await api.delete(`/api/posts/${id}`)
      }
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post')
    }
  }
)

export const togglePostPublish = createAsyncThunk(
  'posts/togglePostPublish',
  async (id, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.togglePostPublish(id)
      } else {
        response = await api.patch(`/api/posts/${id}/publish`)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle post status')
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.data
        state.meta = action.payload.meta
        state.error = null
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch Single Post
      .addCase(fetchPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false
        state.currentPost = action.payload
        state.error = null
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.posts.unshift(action.payload)
        state.error = null
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        const index = state.posts.findIndex(post => post.id === action.payload.id)
        if (index !== -1) {
          state.posts[index] = action.payload
        }
        state.currentPost = action.payload
        state.error = null
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.posts = state.posts.filter(post => post.id !== action.payload)
        state.error = null
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Toggle Post Publish
      .addCase(togglePostPublish.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id)
        if (index !== -1) {
          state.posts[index] = action.payload
        }
        if (state.currentPost && state.currentPost.id === action.payload.id) {
          state.currentPost = action.payload
        }
      })
  },
})

export const { clearError, clearCurrentPost } = postsSlice.actions
export default postsSlice.reducer