// See https://react-redux.js.org/tutorials/quick-start
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice.ts'

// export default configureStore({
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// To avoid repeating useDispatch<AppDispatch>() everywhere, create a custom hook
export const useAppDispatch = () => useDispatch<AppDispatch>();