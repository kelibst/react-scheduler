import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { dayInterface, weekInterface } from './dayReducer';

export interface yearInterface {
    [year: string]: { [week: string]: dayInterface[] }
}

export interface yearStateInterface {
    years: yearInterface
    activeWeek: moment.Moment,
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
let yearsCont = {}
monthArray.map(mth => {
    yearsCont[mth.binDay] = mth.initalDays
})
const initialState: yearStateInterface = {
    years: {
        [initalYear]: yearsCont
    },
    activeWeek: moment().startOf('week')
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
            state.activeWeek = action.payload.weekMoment.clone()
        }
    }
})

export const { genAddMonth, setActiveWeek } = monthSlice.actions
export default monthSlice.reducer