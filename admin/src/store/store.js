import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postsReducer from './postsSlice'
import pagesReducer from './pagesSlice'
import mediaReducer from './mediaSlice'
import themeReducer from './themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    pages: pagesReducer,
    media: mediaReducer,
    theme: themeReducer,
  },
})