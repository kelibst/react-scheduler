import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { dayInterface } from './dayReducer';

interface WeekInterface {
    daysOfWeek: dayInterface[],
    currentWeekMoment?: moment.Moment,
}

const initialState = {
    currentMonth: moment(),
    weeksInMonth: [],
}


export const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload
        },
        addWeekToMonth: (state, action) => {
            state.weeksInMonth.push(action.payload)
        },
    },
})

export const { setCurrentMonth, addWeekToMonth } = monthSlice.actions

export default monthSlice.reducer