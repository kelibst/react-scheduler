import moment from 'moment';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { initialStateProp, setCurrentWeek, setnewCurrentWeekMoment } from '../redux/reducers/dayReducer';
import { RootState } from '../redux/store';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const WeekDayCalendar: React.FC = () => {
  const dispatch = useDispatch()
  const { daysOfWeek, hoursOfDay, currentWeekMoment } = useSelector((state: RootState) => state.week_days)


  return (
    <table className='border'>
      <thead className='border-b'>
        <tr className='border font-bold text-center px-2'>{currentWeekMoment?.format('MMMM')} - {currentWeekMoment?.format("YY")}</tr>
        <tr className='border px-2'>
          <th><button onClick={() => {
            dispatch(setnewCurrentWeekMoment(currentWeekMoment?.subtract(1, 'week')))
            dispatch(setCurrentWeek(currentWeekMoment))
          }}><AiFillCaretLeft /> </button>Days
            <button onClick={() => {
              dispatch(setnewCurrentWeekMoment(currentWeekMoment?.add(1, 'week')))
              dispatch(setCurrentWeek(currentWeekMoment))
            }}><AiFillCaretRight /> </button>
          </th>
          {hoursOfDay.map(hour => <th className='p-2 border' key={hour}>{hour}</th>)}
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map(day => (
          <tr className='border p-2' key={day.day}>
            <td>{day.day} {day.date.format('DD')}</td>
            {hoursOfDay.map(hour => <td className='p-2 border' key={hour}></td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeekDayCalendar;
