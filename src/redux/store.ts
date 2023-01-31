import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import dayReducer from './reducers/dayReducer'
import monthReducer from './reducers/monthReducer'
import userReducer from './reducers/userReducer'


export const store = configureStore({
    reducer: {
        week_days: dayReducer,
        month: monthReducer,
        users: userReducer
    },
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch