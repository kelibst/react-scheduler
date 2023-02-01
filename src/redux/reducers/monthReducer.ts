import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { weekInterface } from './dayReducer';


export interface yearInterface {
    [year: string]: { [month: string]: weekInterface[] }
}


export interface initialMonthProp {
    years: yearInterface
    currentMonth: weekInterface[],
    activeYear: string,
    activeMonth: string,
    initialActiveWeek: number
}

moment.updateLocale('en', { week: { dow: 1 } })
// Get the current month and calculate the number of weeks in it
let currentMonth = moment().startOf('month');
// let weeksInMonth = currentMonth.isoWeeksInMonth();


export const generateMonth = (currentMonth: moment.Moment, initalWeekMoment: moment.Moment) => {
    let initialActiveInd = 0
    let monthWeeks = []
    for (let i = 0; i < 6; i++) {
        let currentWeekStart = currentMonth.clone().startOf('week');
        let initalDays = []

        for (let j = 0; j < 6; j++) {
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
        if (initalWeekMoment.isSame(currentWeekStart, 'week')) {
            initialActiveInd = i
        }
        currentMonth.add(1, 'week');
    }
    return { monthWeeks, initialActiveInd }
}

const { monthWeeks, initialActiveInd } = generateMonth(moment().startOf('month'), moment().startOf('week'))

let initialYear = moment().format('yyyy').toString()
let initialMonth = moment().format('MMMM').toString()

const initialState: initialMonthProp = {
    years: {
        [initialYear]: {
            [initialMonth]: monthWeeks,
        },
    },
    currentMonth: monthWeeks,
    activeYear: moment().format("YYYY"),
    activeMonth: moment().format("MMMM").toString(),
    initialActiveWeek: initialActiveInd
}


export const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        addNewMonth: (state, action) => {
            let curmonth = action.payload.month.clone().format("MMMM")
            let curYear = action.payload.week.clone().format("yy")
            const { monthWeeks, initialActiveInd } = generateMonth(action.payload.month, action.payload.week)
            console.log(curYear, curmonth);

            state.years[curYear] = {
                [curmonth]: monthWeeks
            }
            state.initialActiveWeek = initialActiveInd
            state.activeMonth = curmonth
            state.activeYear = curYear
        },
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload
        },
        setInitalActiveWeekInd: (state, action) => {
            state.initialActiveWeek = action.payload
        }
    },
})

export const { setCurrentMonth, setInitalActiveWeekInd, addNewMonth } = monthSlice.actions

export default monthSlice.reducer