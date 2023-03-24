import moment, { months } from 'moment';
import React, { Dispatch, FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AiFillCaretLeft, AiFillCaretRight, AiFillCloseCircle } from "react-icons/ai";
import { addAssignedHour, genAddMonth, removeAssignedHour, setActiveMonth, setActiveWeek, yearInterface } from '../redux/reducers/monthReducer';
import { userInterface } from '../redux/reducers/userReducer';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { AnyAction } from 'redux';
import { HomeProps } from './Home';

interface monthTableRefInter {
  monthTableRef: MutableRefObject<null>
}

export const genActiveMonth = (monthMonent: moment.Moment, years: yearInterface, dispatch: Dispatch<AnyAction>) => {
  let activeMonth = []
  let year = monthMonent.format('yyyy')
  monthMonent = monthMonent.clone().startOf('month')

  let binDay = `${monthMonent.clone().startOf('week').format('DD')}-${monthMonent.clone().startOf('week').format('MMM')}`
  let lastDay = `${monthMonent.clone().endOf('month').startOf('week').format('DD')}-${monthMonent.clone().endOf('month').startOf('week').format('MMM')}`
  //if the needed month or beginning and ending week is not available it generates that and moves on

  if (!years[year] || !years[year][binDay] || !years[year][lastDay]) {
    dispatch(genAddMonth({ monthMoment: monthMonent }))
  }
  let i = 0
  while (i < 5) {
    binDay = `${monthMonent.startOf('week').format('DD')}-${monthMonent.startOf('week').format('MMM')}`
    activeMonth.push(years[year][binDay])
    i += 1
    monthMonent.add(1, 'week')
  }

  return activeMonth
}

const MonthCalendar: FC<monthTableRefInter> = ({ monthTableRef }) => {
  console.log(monthTableRef, 'monthrab');
  
  const dispatch = useDispatch()
  moment.updateLocale('en', { week: { dow: 1 } })

  const { show, msg, danger, weekView } = useSelector((state: RootState) => state.notification)
  const { hoursOfDay } = useSelector((state: RootState) => state.month)
  const { years, activeWeek, activeMonth } = useSelector((state: RootState) => state.month)

  let year = activeWeek.format('yyyy')
  let binDay = `${activeWeek.format('DD')}-${activeWeek.format('MMM')}`
  console.log(activeMonth, 'activemonth');
  

  useEffect(() => {
    const newactiveMonth = genActiveMonth(activeWeek.clone(), years, dispatch)
    dispatch(setActiveMonth(newactiveMonth))
  }, [])

  return (
    <div>
      <table className='border' ref={monthTableRef}>
        <thead>
          <tr className='border'>
            <th className='p-2 m-2'>Hours of Day</th>
            {activeMonth.map((week, ind) => {
              return week?.map((day: any, index: number) => {
                return (
                  <th key={index} className='border p-3 font-bold'>
                    {`  ${day.date.format('dd')}  ${day.date.format('DD')} ${day.date.format('MMM')}  ${day.date.format('YY')}`}
                  </th>
                )
              })
            })}
          </tr>
        </thead>
        <tbody className='m-2 p-2'>
          {hoursOfDay.map((hour, hourIndex) => (
            <tr key={hourIndex} className='border'>
              <td className='p-2 m-2'>{hour}</td>
              {activeMonth.map((week, ind) => {
                return week?.map((day: any, dayIndex: number) => (
                  <td key={`${'dsom'}-${dayIndex}`} className='border p-3'>
                    {day?.assignedHours
                      ?.filter((assignedHour: any) => assignedHour.time === hour)
                      .map((assignedHour: any, ind: number) => (
                        <div className="bg-gray-100 relative my-2 rounded-md px-3 text-bold" key={assignedHour.assignedUser.name}>
                          <span className='font-medium'>
                            {assignedHour.assignedUser.name}
                          </span>
                          <span className='absolute top-0 right-0'>
                            <AiFillCloseCircle />
                          </span>
                        </div>
                      ))}
                  </td>
                ))
              })}

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default MonthCalendar;
