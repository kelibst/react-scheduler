import { createSlice } from "@reduxjs/toolkit"

export interface userInterface {
    name: string,
    dob: Date,
    email: string,
    phone: string
    isAdmin: boolean
}
const initialState: userInterface[] = [{
    name: "keli",
    dob: new Date(),
    email: 'kbooster12@gmail.com',
    phone: "+233546149861",
    isAdmin: false
}]

export const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state = [...state, action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser } = counterSlice.actions

export default counterSlice.reducer