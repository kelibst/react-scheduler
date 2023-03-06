import { createSlice } from '@reduxjs/toolkit';
export interface notificationInterface {
    show: boolean,
    msg: string,
    danger: boolean,
    weekView: boolean
}

const initialState: notificationInterface = {
    show: false,
    msg: '',
    danger: false,
    weekView: true
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
      },
      setweekView: (state) => {
        state.weekView = !state.weekView
      }
    }
})

export const { setShowNotification, setweekView } = notificationSlice.actions
export default notificationSlice.reducer