import moment, { months } from 'moment';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Action } from 'redux';
// import { addAssignedHour, initialStateProp, setCurrentWeek, setnewCurrentWeekMoment } from '../redux/reducers/dayReducer';
// import { RootState } from '../redux/store';
// import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
// import { addNewMonth, setInitalActiveWeekInd } from '../redux/reducers/monthReducer';

const WeekDayCalendar: React.FC = () => {
  const dispatch = useDispatch()
  // const { activeWeek, hoursOfDay} = useSelector((state: RootState) => state.week_days)
  moment.updateLocale('en', { week: { dow: 1 } })
  // const { years, currentMonth, initialActiveWeek, activeMonth, activeYear } = useSelector((state: RootState) => state.month)
  let currentWeekMoment = moment().startOf('week')
  const genWeek = (currentWeekMoment) => {
    let endDay = ''
    let binDay = `${currentWeekMoment.format('DD')}-${currentWeekMoment.format('MMM')}`
     let initalDays = []
    
     for (let j = 0; j < 7; j++) {
            let day = {
                day: currentWeekMoment.format('dddd'),
                date: currentWeekMoment.clone(),
                assignedHours: []
            }
       let index = `${currentWeekMoment.format('DD')}-${currentWeekMoment.format('MMM')}`
            initalDays.push(day);
       currentWeekMoment.add(1, 'day');
     }
    return {[binDay]: initalDays}
  }

  const days = genWeek(currentWeekMoment)
  const days1 = genWeek(currentWeekMoment)
  console.log(days, 'days');
  console.log(days1, 'days1');

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

//   const currentYears = years[activeYear][activeMonth][initialActiveWeek] 

// console.log(years, initialActiveWeek);

  return (
    <table className='border'>
      {/* <thead className='border-b'>
        <tr className='border font-bold text-center px-2'>{currentYears.currentWeekMoment?.format('MMMM')} - {currentYears.currentWeekMoment?.format("YY")}</tr>
        <tr className='border px-2'>
          <th><button onClick={() => {
            if (initialActiveWeek === 0) {
              dispatch(addNewMonth({month: currentYears.currentWeekMoment.subtract(1, 'month').startOf("month"), week: currentYears.currentWeekMoment.subtract(1, 'week').startOf('week')}))
            }  else {
               dispatch(setInitalActiveWeekInd(initialActiveWeek -1))
            }
          }}><AiFillCaretLeft /> </button>Days
            <button onClick={() => {
              if (initialActiveWeek === 5) {
                dispatch(addNewMonth({month: currentYears.currentWeekMoment.add(1, 'month').startOf("month"), week: currentYears.currentWeekMoment.add(1, 'week').startOf('week')}))
              } else {
                dispatch(setInitalActiveWeekInd(initialActiveWeek +1))
              }
               
              // dispatch(setnewCurrentWeekMoment(currentWeekMoment?.add(1, 'week')))
              // dispatch(setCurrentWeek(currentWeekMoment))
            }}><AiFillCaretRight /> </button>
          </th>
          {hoursOfDay.map(hour => <th className='p-2 border' key={hour}>{hour}</th>)}
        </tr>
      </thead>
      <tbody onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
        {currentYears.daysOfWeek.map((day, index) => (
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
      </tbody> */}
some table
    </table>
  );
};

export default WeekDayCalendar;
