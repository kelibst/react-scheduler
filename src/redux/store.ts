import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import monthReducer from './reducers/monthReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


export const store = configureStore({
    reducer: {
        month: monthReducer,
        users: userReducer,
        notification: notificationReducer,
    },
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch