import { configureStore } from '@reduxjs/toolkit'
import     pasteReducer  from './Slices/PasteSlice'
import themeReducer from './Slices/themeSlice'
export const store = configureStore({
  reducer: {
    paste:pasteReducer,
    theme:themeReducer,
  },
})