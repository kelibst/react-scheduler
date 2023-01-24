import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { userInterface } from "./userReducer";

export interface dayInterface {
    day: string,
    date: moment.Moment,
    assignedHours?: {
        time: string,
        assignedUser: userInterface
    }
}
moment.updateLocale('en', { week: { dow: 1 } })
let currentWeekStart = moment().startOf('week');
let initalDays = []

for (let i = 0; i < 7; i++) {
    initalDays.push({
        day: currentWeekStart.format('dddd'),
        date: currentWeekStart.clone(),
    });
    currentWeekStart.add(1, 'day');
}


export interface initialStateProp {
    daysOfWeek: dayInterface[],
    currentWeekMoment?: moment.Moment,
    hoursOfDay: string[],
}
const initialState: initialStateProp = {
    daysOfWeek: initalDays,
    currentWeekMoment: moment().startOf('week'),
    hoursOfDay: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
}
export const weekSlice = createSlice({
    name: 'week_days',
    initialState,
    reducers: {
        setCurrentWeek: (state, action) => {
            let newWeek: dayInterface[] = []

            for (let i = 1; i < 8; i++) {
                newWeek.push({
                    day: action.payload.format('dddd'),
                    date: action.payload.clone(),
                });
                action.payload.add(1, 'day');
            }
            state.daysOfWeek = newWeek
        },
        setnewCurrentWeekMoment: (state, action) => {
            state.currentWeekMoment = action.payload.clone()
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentWeek, setnewCurrentWeekMoment } = weekSlice.actions

export default weekSlice.reducer