import moment, { months } from 'moment';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { RootState } from '../redux/store';
import { AiFillCaretLeft, AiFillCaretRight, AiFillCloseCircle } from "react-icons/ai";
import { addAssignedHour, genAddMonth, setActiveWeek } from '../redux/reducers/monthReducer';
// import { addNewMonth, setInitalActiveWeekInd } from '../redux/reducers/monthReducer';

const WeekDayCalendar: React.FC = () => {
  const dispatch = useDispatch()
  const { hoursOfDay } = useSelector((state: RootState) => state.month)
  moment.updateLocale('en', { week: { dow: 1 } })
  const { years, activeWeek } = useSelector((state: RootState) => state.month)
  let year = activeWeek.format('yyyy')
  let binDay = `${activeWeek.format('DD')}-${activeWeek.format('MMM')}`

  let week = years[year][binDay]

  const handleDrop = (e: any) => {
    let user = JSON.parse(e.dataTransfer.getData("user"));
    let column;
    let dataIndex;
    let currentDayofWeek: string;
    let closestParent = e.target.closest('[data-column][data-index]');

    if (closestParent) {
      column = closestParent.getAttribute("data-column");
      dataIndex = closestParent.getAttribute("data-index");
      currentDayofWeek = closestParent.parentElement.firstChild.textContent.split(' ')[0]


      let day = week.find(day => day.day === currentDayofWeek)
      if (!day || !dataIndex) return;
      dispatch(addAssignedHour({
        time: column,
        index: dataIndex,
        assignedUser: user,
        dayMoment: day.date.startOf('week').clone()
      }))
    }
  }

  const traverseWeek = (weekMoment: moment.Moment) => {
    let year: string = weekMoment.format('yyyy')
    let binDay = `${weekMoment.format('DD')}-${weekMoment.format('MMM')}`
    // if we do not have the current year or the current week the user is pushing to in our databae
    // we will use the genAddMonth method to create that month and set the current week to the selected week

    if (!years[year] || !years[year][binDay]) {
      dispatch(genAddMonth({ monthMoment: weekMoment.clone().startOf("month") }))
    }
    dispatch(setActiveWeek({ weekMoment }))
  }


  return (
    <div>
      <div className='border font-bold text-center px-2'>{activeWeek.format('MMMM')} - {activeWeek.format("YY")}</div>
      <table className='border'>
        <thead className='border-b'>
          <tr className='border px-2'>
            <th><button onClick={() => {
              traverseWeek(activeWeek.subtract(1, 'week'))
            }}><AiFillCaretLeft /> </button>Days
              <button onClick={() => {
                traverseWeek(activeWeek.add(1, 'week'))
              }}><AiFillCaretRight /> </button>
            </th>
            {hoursOfDay.map(hour => <th className='p-2 border' key={hour}>{hour}</th>)}
          </tr>
        </thead>
        <tbody onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
          {week?.map((day, index) => (
            <tr className='border p-2' key={day.day}>
              <td>{day.day} {day.date.format('DD')}</td>
              {hoursOfDay.map
                (hour => <td data-column={hour} data-index={index} className='p-2 border' key={hour}>
                  {day.assignedHours.filter(assignedHour => assignedHour.time === hour).map((assignedHour) => (
                    <div className="bg-gray-100 relative rounded-md px-3 " key={assignedHour.assignedUser.name}> 
                   <span>{assignedHour.assignedUser.name}</span>  <span className='absolute top-0 right-0' onClick={() => {
                    console.log('close clicked')
                   }}> <AiFillCloseCircle /></span></div>
                  ))}
                </td>)}   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeekDayCalendar;
