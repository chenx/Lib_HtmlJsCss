// See https://react-redux.js.org/tutorials/quick-start

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
