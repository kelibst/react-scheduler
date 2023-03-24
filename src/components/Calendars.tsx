import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { HomeProps } from './Home'
import MonthCalendar from './MonthCalendar'
import WeekDayCalendar from './WeekDayCalendar'

const Calendars: FC<HomeProps> = (props) => {
    const {weekView} = useSelector((state: RootState) => state.notification)
  if(weekView)
    return (
    <div>
        <WeekDayCalendar />
    </div>
  )
  return (
    <div>
        <MonthCalendar  monthTableRef={props.monthtableRef}/>
    </div>
  )
}

export default Calendars