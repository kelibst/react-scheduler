import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';
import { userInterface } from './userReducer';

export interface assignedHourInterface {
    time: string,
    assignedUser: userInterface
}

export interface dayInterface {
    day: string,
    date: moment.Moment,
    assignedHours: assignedHourInterface[]
}

export interface yearInterface {
    [year: string]: { [week: string]: dayInterface[] }
}
export interface monthInterfce {
    binDay: string;
    initalDays: {
        day: string;
        date: moment.Moment;
        assignedHours: never[];
    }[];
}[]
export interface yearContInter { [week: string]: dayInterface[] }
export interface yearStateInterface {
    years: yearInterface
    activeWeek: moment.Moment,
    hoursOfDay: string[],
    activeMonth: any[]
}

moment.updateLocale('en', { week: { dow: 1 } })

const genWeek = (currentWeekMoment: moment.Moment) => {
    let binDay = `${currentWeekMoment.format('DD')}-${currentWeekMoment.format('MMM')}`
    let initalDays = []

    for (let j = 0; j < 7; j++) {
        let day = {
            day: currentWeekMoment.format('dddd'),
            date: currentWeekMoment.clone(),
            assignedHours: []
        }
        initalDays.push(day);
        currentWeekMoment.add(1, 'day');
    }
    return { binDay, initalDays }
}

const genMonth = (monthMoment: moment.Moment) => {
    let i = 0
    let monthArry = []
    while (i < 5) {
        const week = genWeek(monthMoment.startOf('week'))
        monthArry.push(week)
        i += 1
    }
    return monthArry
}

const genActiveMonth = (monthMonent: moment.Moment, state: yearInterface) => {
    let activeMonth = []
    let year = monthMonent.format('yyyy')
    let binDay = `${monthMonent.format('DD')}-${monthMonent.format('MMM')}`
    // if(!state.years[year])
    let i = 0
    while (i < 5) {
        activeMonth.push(state[year][binDay])
        i += 1
        monthMonent.add(1, 'week')
    }
    return activeMonth
}

const motMoment = moment().startOf('month')
const initalYear = motMoment.format("yyyy")
const monthArray = genMonth(motMoment)
let yearsCont: yearContInter = {}
monthArray.map(mth => {
    yearsCont[mth.binDay] = mth.initalDays
})

// let currentActiveMonth = genActiveMonth(motMoment, state)
const initialState: yearStateInterface = {
    years: {
        [initalYear]: yearsCont
    },
    activeWeek: moment().startOf('week'),
    hoursOfDay: ["Morning 8am - 2Pm", "Afternoon 2Pm - 8px", "Night 8pm - 8am"],
    activeMonth: []
    // ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
}


export const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        genAddMonth: (state, action) => {
            const { monthMoment } = action.payload
            let year = monthMoment.format('yyyy')
            const monthArray = genMonth(monthMoment)
            monthArray.map(mth => {
                if (!state.years[year]) {
                    state.years[year] = {}
                }
                if (!state.years[year][mth.binDay]) {
                    state.years[year][mth.binDay] = mth.initalDays
                }
            })
        },
        setActiveWeek: (state, action) => {
            //set the currentActive Week 
            state.activeWeek = action.payload.weekMoment.clone()
        },
        addAssignedHour: (state, action) => {
            //add user to the assignedHour array on the specify day
            const { index, time, assignedUser, dayMoment } = action.payload
            let year = dayMoment.format('yyyy')
            let beginningWeek = `${dayMoment.startOf('week').format('DD')}-${dayMoment.startOf('week').format('MMM')}`
            // Check if assignedUser already exists in the assignedHours array
            let existingUser = state.years[year][beginningWeek][Number(index)].assignedHours.find(hour => hour.assignedUser.id === assignedUser.id)

            if (!existingUser) {
                state.years[year][beginningWeek][Number(index)].assignedHours.push({
                    time,
                    assignedUser
                })
            }
        },
        removeAssignedHour: (state, action) => {
            const { index, userId, dayMoment } = action.payload
            let year = dayMoment.format('yyyy')
            let beginningWeek = `${dayMoment.format('DD')}-${dayMoment.format('MMM')}`
            let assgnedHour = state.years[year][beginningWeek][Number(index)].assignedHours.filter(user => {
                return user.assignedUser.id !== userId
            })
            state.years[year][beginningWeek][Number(index)].assignedHours = assgnedHour
        },
        setActiveMonth: (state, action) => {
            state.activeMonth = action.payload
        }
    }
})

export const { genAddMonth, setActiveWeek, addAssignedHour, removeAssignedHour, setActiveMonth } = monthSlice.actions
export default monthSlice.reducer