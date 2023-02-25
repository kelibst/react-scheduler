import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

export interface userInterface {
    id: string,
    name: string,
    dob: Date,
    email: string,
    phone: string
    isAdmin: boolean
}
const initialState = {
    allUsers: [{
        id: uuidv4(),
        name: "keli",
        dob: new Date(),
        email: 'kbooster12@gmail.com',
        phone: "+233546149861",
        isAdmin: false
    },
    {
        id: uuidv4(),
        name: "Francis Denis",
        dob: new Date(),
        email: 'kbooste212@gmail.com',
        phone: "+233546149861",
        isAdmin: false
    },
    {
        id: uuidv4(),
        name: "Felix Annor",
        dob: new Date(),
        email: 'kbooste212@gmail.com',
        phone: "+233546149861",
        isAdmin: false
    }
        ,
    {
        id: uuidv4(),
        name: "Fred Gbator",
        dob: new Date(),
        email: 'kbooste212@gmail.com',
        phone: "+233546149861",
        isAdmin: false
    },
    {
        id: uuidv4(),
        name: "Frat Edwin",
        dob: new Date(),
        email: 'kbooste212@gmail.com',
        phone: "+233546149861",
        isAdmin: false
    }
    ]
}


export const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.allUsers = [...state.allUsers, action.payload]
        }, 
        removeUser: (state, action) => {
            state.allUsers = state.allUsers.filter(user => user.id !== action.payload.userId)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = counterSlice.actions

export default counterSlice.reducer