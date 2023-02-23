import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
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
export interface yearContInter { [week: string]: dayInterface[] }
export interface yearStateInterface {
    years: yearInterface
    activeWeek: moment.Moment,
    hoursOfDay: string[],
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

const motMoment = moment().startOf('month')
const initalYear = motMoment.format("yyyy")
const monthArray = genMonth(motMoment)
let yearsCont: yearContInter = {}
monthArray.map(mth => {
    yearsCont[mth.binDay]= mth.initalDays
})
const initialState: yearStateInterface = {
    years: {
        [initalYear]: yearsCont
    },
    activeWeek: moment().startOf('week'),
    hoursOfDay: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],
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
                state.years[year][mth.binDay] = mth.initalDays
            })
        },
        setActiveWeek: (state, action) => {
            //set the currentActive Week 
            state.activeWeek = action.payload.weekMoment.clone()
        },
        addAssignedHour: (state, action) => {
            //add user to the assignedHour array on the specify day
            const {index, time, assignedUser, dayMoment} = action.payload
            let year = dayMoment.format('yyyy')
            let beginningWeek =  `${dayMoment.format('DD')}-${dayMoment.format('MMM')}`
            
            state.years[year][beginningWeek][Number(index)].assignedHours.push({
                time,
                assignedUser
            });
        }, 
        removeAssignedHour: (state, action) => {
            const {index, userId, dayMoment} = action.payload
            let year = dayMoment.format('yyyy')
            let beginningWeek =  `${dayMoment.format('DD')}-${dayMoment.format('MMM')}`
            let assgnedHour = state.years[year][beginningWeek][Number(index)].assignedHours.filter(user => {
                return user.assignedUser.id !== userId
            })
            state.years[year][beginningWeek][Number(index)].assignedHours = assgnedHour
        }
    }
})

export const { genAddMonth, setActiveWeek, addAssignedHour, removeAssignedHour } = monthSlice.actions
export default monthSlice.reducer