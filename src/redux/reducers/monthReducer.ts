import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { weekInterface } from './dayReducer';

export interface initialMonthProp {
    currentMonth: weekInterface[],
}

moment.updateLocale('en', { week: { dow: 1 } })
// Get the current month and calculate the number of weeks in it
let currentMonth = moment().startOf('month');
// let weeksInMonth = currentMonth.isoWeeksInMonth();

let monthWeeks = []

// Create an array of weeks for the current month
for (let i = 0; i < 6; i++) {
    let currentWeekStart = currentMonth.clone().startOf('week');
    let initalDays = []

    for (let j = 0; j < 7; j++) {
        let day = {
            day: currentWeekStart.format('dddd'),
            date: currentWeekStart.clone(),
            assignedHours: []
        }
        initalDays.push(day);
        currentWeekStart.add(1, 'day');
    }

    monthWeeks.push({
        daysOfWeek: initalDays,
        currentWeekMoment: currentWeekStart.clone()
    });
    currentMonth.add(1, 'week');
}


const initialState: initialMonthProp = {
    currentMonth: monthWeeks,
}


export const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload
        },
    },
})

export const { setCurrentMonth } = monthSlice.actions

export default monthSlice.reducer