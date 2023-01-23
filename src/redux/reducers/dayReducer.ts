import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { userInterface } from "./userReducer";

export interface dayInterface {
    day: string,
    date: string,
    assignedHours?: {
        time: string,
        assignedUser: userInterface
    }
}

let currentWeekStart = moment().startOf('week');
let initalDays = []

for (let i = 0; i < 7; i++) {
    initalDays.push({
        day: currentWeekStart.format('dddd'),
        date: currentWeekStart.format('MM/DD/YYYY'),
    });
    currentWeekStart.add(1, 'day');
}


export interface initialStateProp {
    daysOfWeek: dayInterface[]
    hoursOfDay: string[]
}
const initialState: initialStateProp = {
    daysOfWeek: initalDays,
    hoursOfDay: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
}
export const weekSlice = createSlice({
    name: 'week_days',
    initialState,
    reducers: {
        setCurrentWeek: (state) => {
            let currentWeekStart = moment().startOf('week');

            for (let i = 0; i < 7; i++) {
                console.log('running for', i);

                state.daysOfWeek.push({
                    day: currentWeekStart.format('dddd'),
                    date: currentWeekStart.format('MM/DD/YYYY'),
                });
                currentWeekStart.add(1, 'day');
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentWeek } = weekSlice.actions

export default weekSlice.reducer