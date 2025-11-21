import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'
import { mockApi, shouldUseMockApi } from '../services/mockApi'

// Async thunks
export const fetchPages = createAsyncThunk(
  'pages/fetchPages',
  async ({ page = 1, search = '', published = null } = {}, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.getPages({ page, search, published })
      } else {
        const params = new URLSearchParams({ page })
        if (search) params.append('search', search)
        if (published !== null) params.append('published', published)
        
        response = await api.get(`/api/pages?${params}`)
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pages')
    }
  }
)

export const fetchPage = createAsyncThunk(
  'pages/fetchPage',
  async (id, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.getPage(id)
      } else {
        response = await api.get(`/api/pages/${id}`)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch page')
    }
  }
)

export const createPage = createAsyncThunk(
  'pages/createPage',
  async (pageData, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.createPage(pageData)
      } else {
        response = await api.post('/api/pages', pageData)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create page')
    }
  }
)

export const updatePage = createAsyncThunk(
  'pages/updatePage',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.updatePage(id, data)
      } else {
        response = await api.put(`/api/pages/${id}`, data)
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update page')
    }
  }
)

export const deletePage = createAsyncThunk(
  'pages/deletePage',
  async (id, { rejectWithValue }) => {
    try {
      if (shouldUseMockApi()) {
        await mockApi.deletePage(id)
      } else {
        await api.delete(`/api/pages/${id}`)
      }
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete page')
    }
  }
)

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [],
    currentPage: null,
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
    clearCurrentPage: (state) => {
      state.currentPage = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pages
      .addCase(fetchPages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false
        state.pages = action.payload.data
        state.meta = action.payload.meta
        state.error = null
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch Single Page
      .addCase(fetchPage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.loading = false
        state.currentPage = action.payload
        state.error = null
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Create Page
      .addCase(createPage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.loading = false
        state.pages.unshift(action.payload)
        state.error = null
      })
      .addCase(createPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Update Page
      .addCase(updatePage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.loading = false
        const index = state.pages.findIndex(page => page.id === action.payload.id)
        if (index !== -1) {
          state.pages[index] = action.payload
        }
        state.currentPage = action.payload
        state.error = null
      })
      .addCase(updatePage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Delete Page
      .addCase(deletePage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.loading = false
        state.pages = state.pages.filter(page => page.id !== action.payload)
        state.error = null
      })
      .addCase(deletePage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentPage } = pagesSlice.actions
export default pagesSlice.reducer