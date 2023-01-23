import moment from 'moment';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { initialStateProp, setCurrentWeek } from '../redux/reducers/dayReducer';
import { RootState } from '../redux/store';


const WeekDayCalendar: React.FC = () => {
  const dispatch = useDispatch()
  const { daysOfWeek, hoursOfDay } = useSelector((state: RootState) => state.week_days)
 
  
  console.log(daysOfWeek);
  
useEffect(() => {
    // if (daysOfWeek.length === 0)  dispatch(setCurrentWeek())
  }, [dispatch,  daysOfWeek])
  return (
    <table>
      <thead>
        <tr>
          <th>Weekdays</th>
          {hoursOfDay.map(hour => <th key={hour}>{hour}</th>)}
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map(day => (
          <tr key={day.day}>
            <td>{day.day}</td>
            {hoursOfDay.map(hour => <td key={hour}></td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeekDayCalendar;
