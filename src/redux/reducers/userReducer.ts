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
        name: "keli Booster",
        dob: new Date("1997-04-12"),
        email: 'kbooster12@gmail.com',
        phone: "+233546149861",
        isAdmin: false
    },
    // {
    //     id: uuidv4(),
    //     name: "Francis Denis",
    //     dob: new Date(),
    //     email: 'kbooste212@gmail.com',
    //     phone: "+233546149861",
    //     isAdmin: false
    // },
    // {
    //     id: uuidv4(),
    //     name: "Felix Annor",
    //     dob: new Date(),
    //     email: 'kbooste212@gmail.com',
    //     phone: "+233546149861",
    //     isAdmin: false
    // }
    //     ,
    // {
    //     id: uuidv4(),
    //     name: "Fred Gbator",
    //     dob: new Date(),
    //     email: 'kbooste212@gmail.com',
    //     phone: "+233546149861",
    //     isAdmin: false
    // },
    // {
    //     id: uuidv4(),
    //     name: "Frat Edwin",
    //     dob: new Date(),
    //     email: 'kbooste212@gmail.com',
    //     phone: "+233546149861",
    //     isAdmin: false
    // }
    ],
    openUserModal: false,
    selectedUser: {}
}





export const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            let newUser = { id: uuidv4(), ...action.payload}
            state.allUsers = [...state.allUsers, newUser]
        }, 
        removeUser: (state, action) => {
            state.allUsers = state.allUsers.filter(user => user.id !== action.payload.userId)
        },
        updateUser: (state, action) => {
            const { userId, name, dob, email, phone, isAdmin } = action.payload;
            const userIndex = state.allUsers.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                state.allUsers[userIndex] = {
                    id: userId,
                    name: name || state.allUsers[userIndex].name,
                    dob: dob || state.allUsers[userIndex].dob,
                    email: email || state.allUsers[userIndex].email,
                    phone: phone || state.allUsers[userIndex].phone,
                    isAdmin: isAdmin === undefined ? state.allUsers[userIndex].isAdmin : isAdmin,
                };
            }
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setOpenUserModal: (state) => {
            state.openUserModal = !state.openUserModal
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser, setOpenUserModal, updateUser, setSelectedUser } = counterSlice.actions

export default counterSlice.reducer