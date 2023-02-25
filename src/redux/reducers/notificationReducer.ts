import { createSlice } from '@reduxjs/toolkit';
export interface notificationInterface {
    show: boolean,
    msg: string,
    danger: boolean
}

const initialState: notificationInterface = {
    show: false,
    msg: '',
    danger: false
}


export const notificationSlice = createSlice({
    name: 'showNotification',
    initialState,
    reducers: {
      setShowNotification: (state, action) => {
        state.show = !state.show
        state.msg = action.payload.message
        if (action.payload?.danger) {
          state.danger = action.payload.danger
        } 
      }
    }
})

export const { setShowNotification } = notificationSlice.actions
export default notificationSlice.reducer