import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'
import { mockApi, shouldUseMockApi } from '../services/mockApi'

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.login(email, password)
      } else {
        response = await api.post('/api/login', { email, password })
      }
      
      const { user, token } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      return { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.register(name, email, password)
      } else {
        response = await api.post('/api/register', { name, email, password })
      }
      
      const { user, token } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      return { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      if (!shouldUseMockApi()) {
        await api.post('/api/logout')
      }
      localStorage.removeItem('token')
      return null
    } catch (error) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('token')
      return null
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return rejectWithValue('No token found')
      }
      
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.me()
      } else {
        response = await api.get('/api/me')
      }
      
      return { user: response.data.user, token }
    } catch (error) {
      localStorage.removeItem('token')
      return rejectWithValue('Authentication failed')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ name, email }, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.updateProfile(name, email)
      } else {
        response = await api.put('/api/profile', { name, email })
      }
      
      return { user: response.data.user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed')
    }
  }
)

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      let response
      if (shouldUseMockApi()) {
        response = await mockApi.updatePassword(currentPassword, newPassword)
      } else {
        response = await api.put('/api/password', { current_password: currentPassword, new_password: newPassword })
      }
      
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password update failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = action.payload
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = action.payload
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
      })
      
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.error = null
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer