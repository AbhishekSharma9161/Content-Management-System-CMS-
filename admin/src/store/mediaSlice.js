import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'
import { mockApi, shouldUseMockApi } from '../services/mockApi'

// Async thunks
export const fetchMedia = createAsyncThunk(
  'media/fetchMedia',
  async ({ page = 1, search = '', type = null } = {}, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.getMedia({ page, search, type })
      } else {
        const params = new URLSearchParams({ page })
        if (search) params.append('search', search)
        if (type) params.append('type', type)
        
        response = await api.get(`/api/media?${params}`)
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch media')
    }
  }
)

export const uploadMedia = createAsyncThunk(
  'media/uploadMedia',
  async (file, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.uploadMedia(file)
      } else {
        const formData = new FormData()
        formData.append('file', file)
        
        response = await api.post('/api/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload file')
    }
  }
)

export const deleteMedia = createAsyncThunk(
  'media/deleteMedia',
  async (id, { rejectWithValue }) => {
    try {
      if (shouldUseMockApi()) {
        await mockApi.deleteMedia(id)
      } else {
        await api.delete(`/api/media/${id}`)
      }
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete media')
    }
  }
)

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    media: [],
    loading: false,
    uploading: false,
    error: null,
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Media
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false
        state.media = action.payload.data
        state.meta = action.payload.meta
        state.error = null
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Upload Media
      .addCase(uploadMedia.pending, (state) => {
        state.uploading = true
        state.error = null
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.uploading = false
        state.media.unshift(action.payload)
        state.error = null
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.uploading = false
        state.error = action.payload
      })
      
      // Delete Media
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false
        state.media = state.media.filter(item => item.id !== action.payload)
        state.error = null
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = mediaSlice.actions
export default mediaSlice.reducer