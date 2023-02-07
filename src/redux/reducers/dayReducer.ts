import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { userInterface } from "./userReducer";

export interface assignedHourInterface {
    time: string,
    assignedUser: userInterface
}

export interface dayInterface {
    day: string,
    date: moment.Moment,
    assignedHours: assignedHourInterface[]
}

export interface weekInterface {
    daysOfWeek: dayInterface[],
    currentWeekMoment: moment.Moment,
}


export interface initialStateProp {
    activeWeek?: dayInterface[],
    hoursOfDay: string[],
}

let currentWeekStart = moment().startOf('week');
let initalDays = []

for (let i = 0; i < 7; i++) {
    initalDays.push({
        day: currentWeekStart.format('dddd'),
        date: currentWeekStart.clone(),
        assignedHours: []
    });
    currentWeekStart.add(1, 'day');
}


const initialState: initialStateProp = {
    activeWeek: initalDays,
    hoursOfDay: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],
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
                    assignedHours: []
                });
                action.payload.add(1, 'day');
            }
            // state.daysOfWeek = newWeek
        },
        setnewCurrentWeekMoment: (state, action) => {
            // state.currentWeekMoment = action.payload.clone()
        },
        setActiveWeek: (state, action) => {
            state.activeWeek = action.payload
        },
        addAssignedHour: (state, action) => {
            let dayIndex = action.payload.index;
            let hour = action.payload.time;
            let assignedUser = action.payload.assignedUser;
            // state.daysOfWeek[dayIndex].assignedHours.push({
            //     time: hour,
            //     assignedUser
            // });
        }
    },
})

export const { } = weekSlice.actions

export default weekSlice.reducer