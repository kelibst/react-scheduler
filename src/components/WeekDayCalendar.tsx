import moment, { months } from 'moment';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { addAssignedHour, initialStateProp, setCurrentWeek, setnewCurrentWeekMoment } from '../redux/reducers/dayReducer';
import { RootState } from '../redux/store';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { setInitalActiveWeekInd } from '../redux/reducers/monthReducer';

const WeekDayCalendar: React.FC = () => {
  const dispatch = useDispatch()
  const { activeWeek, hoursOfDay} = useSelector((state: RootState) => state.week_days)
  const { years, currentMonth, initialActiveWeek } = useSelector((state: RootState) => state.month)
  
  const [activeYear, setActiveYear] = useState(moment().format("YYYY"))
  const [activeMth, setActiveMth] = useState(moment().format("MMMM").toString())

 const handleDrop = (e) => {
    // let user = JSON.parse(e.dataTransfer.getData("user"));
    // let column;
    // let dataIndex;
    // let currentDayofWeek: string;
    // let closestParent = e.target.closest('[data-column][data-index]');
    // if(closestParent){
    // column = closestParent.getAttribute("data-column");
    // dataIndex = closestParent.getAttribute("data-index");
    //   currentDayofWeek = closestParent.parentElement.firstChild.textContent.split(' ')[0]
      
    // let day = daysOfWeek.find(day => day.day === currentDayofWeek)
    
    //   if(!day || !dataIndex) return;
    // dispatch(addAssignedHour({
    //   time: column,
    //   index: dataIndex,
    //   assignedUser: user,
    //   day: day
    // }))
    // }
    

  
  }

  const activeMonth = years[activeYear][activeMth][initialActiveWeek] 

  return (
    <table className='border'>
      <thead className='border-b'>
        <tr className='border font-bold text-center px-2'>{activeMonth.currentWeekMoment?.format('MMMM')} - {activeMonth.currentWeekMoment?.format("YY")}</tr>
        <tr className='border px-2'>
          <th><button onClick={() => {
            dispatch(setInitalActiveWeekInd(initialActiveWeek -1))
          }}><AiFillCaretLeft /> </button>Days
            <button onClick={() => {
               dispatch(setInitalActiveWeekInd(initialActiveWeek +1))
              // dispatch(setnewCurrentWeekMoment(currentWeekMoment?.add(1, 'week')))
              // dispatch(setCurrentWeek(currentWeekMoment))
            }}><AiFillCaretRight /> </button>
          </th>
          {hoursOfDay.map(hour => <th className='p-2 border' key={hour}>{hour}</th>)}
        </tr>
      </thead>
      <tbody onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
        {activeMonth.daysOfWeek.map((day, index) => (
            <tr className='border p-2' key={day.day}>
            <td>{day.day} {day.date.format('DD')}</td>
            {hoursOfDay.map
              (hour => <td data-column={hour} data-index={index} className='p-2 border' key={hour}>
                {day.assignedHours.filter(assignedHour => assignedHour.time === hour).map((assignedHour) => (
                  <div key={assignedHour.assignedUser.name}>{assignedHour.assignedUser.name}</div>
                ))}
              </td>)}
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default WeekDayCalendar;
