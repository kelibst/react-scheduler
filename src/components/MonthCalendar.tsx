import moment, { months } from 'moment';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AiFillCaretLeft, AiFillCaretRight, AiFillCloseCircle } from "react-icons/ai";
import { addAssignedHour, genAddMonth, removeAssignedHour, setActiveMonth, setActiveWeek, yearInterface } from '../redux/reducers/monthReducer';
import { userInterface } from '../redux/reducers/userReducer';
import Notification from './Notifications';
import { setShowNotification, setweekView } from '../redux/reducers/notificationReducer';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { traverseWeek } from './WeekDayCalendar';

const MonthCalendar: React.FC = () => {
  const dispatch = useDispatch()
  moment.updateLocale('en', { week: { dow: 1 } })

  const { show, msg, danger, weekView } = useSelector((state: RootState) => state.notification)
  const { hoursOfDay } = useSelector((state: RootState) => state.month)
  const { years, activeWeek, activeMonth } = useSelector((state: RootState) => state.month)

  let year = activeWeek.format('yyyy')
  let binDay = `${activeWeek.format('DD')}-${activeWeek.format('MMM')}`

  

  const genActiveMonth = (monthMonent: moment.Moment, years: yearInterface) => {
    let activeMonth = []
    let year = monthMonent.format('yyyy')
    monthMonent = monthMonent.clone().startOf('month')
    
    let binDay = `${monthMonent.clone().startOf('week').format('DD')}-${monthMonent.clone().startOf('week').format('MMM')}`
    let lastDay = `${monthMonent.clone().endOf('month').startOf('week').format('DD')}-${monthMonent.clone().endOf('month').startOf('week').format('MMM')}`
    //if the needed month or beginning and ending week is not available it generates that and moves on
    
    if (!years[year] || !years[year][binDay] || !years[year][lastDay] ) {
      dispatch(genAddMonth({ monthMoment: monthMonent}))
    }
    let i = 0
    while(i < 5) {
      binDay = `${monthMonent.startOf('week').format('DD')}-${monthMonent.startOf('week').format('MMM')}`
        activeMonth.push(years[year][binDay])
        i+=1
        monthMonent.add(1, 'week')
    }
    
    return activeMonth
}


  useEffect(() => {
    const newactiveMonth = genActiveMonth(activeWeek.clone(), years)
    dispatch(setActiveMonth(newactiveMonth))
  }, [])
  return (
    <div>
      <div   className='flex justify-center align-middle border font-bold text-center m-4 p-4'> 
      <button onClick={() => {
              const newactiveMonth = genActiveMonth(activeWeek.clone().subtract(1, 'month'), years)  
              traverseWeek(activeWeek.subtract(1, 'month').startOf('week'), years, dispatch)
              dispatch(setActiveMonth(newactiveMonth))
            }}><AiFillCaretLeft /> </button>
       {activeWeek.format('MMMM')} - {activeWeek.format("YY")} 
        <div>
        {weekView === false && <button onClick={() => dispatch(setweekView())}><BsFillCalendar2WeekFill /> </button> }
        </div>
        <button onClick={async() => {
                const newactiveMonth = genActiveMonth(activeWeek.clone().add(1, 'month'), years)  
                await dispatch(setActiveMonth(newactiveMonth))
                await traverseWeek(activeWeek.add(1, 'month').startOf('week'), years, dispatch)
              }}><AiFillCaretRight /> </button>
      </div>
      <table className='border'>
        <thead>
          <tr className='border'>
            <th className='p-2 m-2'>Hours of Day</th>
            {activeMonth.map((week, ind) => {  
              return week?.map((day, index) => {
                return (
                <th key={index} className='border p-3 font-bold'>
                  {`${day.date.format('DD')} - ${day.date.format('MMM')} - ${day.date.format('YY')}`}
                </th>
              )})
            })}
          </tr>
        </thead>
        <tbody className='m-2 p-2'>
          {hoursOfDay.map((hour, index) => (
            <tr key={index} className='border'>
              <td className='p-2 m-2'>{hour}</td>
              {activeMonth.map((week, ind) => {
                return week?.map((day, dayIndex) => (
                  <td key={`${index}-${dayIndex}`} className='border p-3'>
                    {day?.assignedHours?.map((assignedHour, ind) => (
                    <div className="bg-gray-100 relative my-2 rounded-md px-3 text-bold" key={assignedHour.assignedUser.name}> 
                   <span className='font-medium'>{assignedHour.assignedUser.name}</span>  <span className='absolute top-0 right-0'> <AiFillCloseCircle /></span></div>
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
