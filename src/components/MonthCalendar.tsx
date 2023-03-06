import moment, { months } from 'moment';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AiFillCaretLeft, AiFillCaretRight, AiFillCloseCircle } from "react-icons/ai";
import { addAssignedHour, genAddMonth, removeAssignedHour, setActiveWeek } from '../redux/reducers/monthReducer';
import { userInterface } from '../redux/reducers/userReducer';
import Notification from './Notifications';
import { setShowNotification, setweekView } from '../redux/reducers/notificationReducer';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';

const MonthCalendar: React.FC = () => {
  const dispatch = useDispatch()
  moment.updateLocale('en', { week: { dow: 1 } })

  const { show, msg, danger, weekView } = useSelector((state: RootState) => state.notification)
  const { hoursOfDay } = useSelector((state: RootState) => state.month)
  const { years, activeWeek, activeMonth } = useSelector((state: RootState) => state.month)

  let year = activeWeek.format('yyyy')
  let binDay = `${activeWeek.format('DD')}-${activeWeek.format('MMM')}`

  return (
    <div>
      <div className='border font-bold text-center m-4 p-4'>{activeWeek.format('MMMM')} - {activeWeek.format("YY")} 
        <div>
        {weekView === false && <button onClick={() => dispatch(setweekView())}><BsFillCalendar2WeekFill /> </button> }
        </div>
      </div>
      <table className='border'>
        <thead>
          <tr className='border'>
            <th className='p-2 m-2'>Hours of Day</th>
            {activeMonth.map((week, ind) => {
              return week.initalDays.map((day, index) => {
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
                return week.initalDays.map((day, dayIndex) => (
                  <td key={`${index}-${dayIndex}`} className='border p-3'>
                    {day?.assignedHour?.map((assignedHour, ind) => (
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
