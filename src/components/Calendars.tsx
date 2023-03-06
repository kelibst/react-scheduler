import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import MonthCalendar from './MonthCalendar'
import WeekDayCalendar from './WeekDayCalendar'

const Calendars = () => {
    const {weekView} = useSelector((state: RootState) => state.notification)
  if(weekView)
    return (
    <div>
        <WeekDayCalendar />
    </div>
  )
  return (
    <div>
        <MonthCalendar />
    </div>
  )
}

export default Calendars