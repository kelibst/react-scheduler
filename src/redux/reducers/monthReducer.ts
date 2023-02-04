import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { weekInterface } from './dayReducer';

export interface yearInterface {
    [year: string]: weekInterface[]
}

export interface yearStateInterface {
    years: yearInterface
    currentMonth: weekInterface[],
}


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
    while (i < 6) {
        const week = genWeek(monthMoment.startOf('week'))
        monthArry.push(week)
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
    }
}


moment.updateLocale('en', { week: { dow: 1 } })

