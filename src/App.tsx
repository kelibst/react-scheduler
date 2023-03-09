import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import './App.css'
import Calendars from "./components/Calendars";
import MonthCalendar from "./components/MonthCalendar";
import Notification from "./components/Notifications";
import UsersList from "./components/UsersList";
import WeekDayCalendar from "./components/WeekDayCalendar";
import { setShowNotification } from "./redux/reducers/notificationReducer";
import { RootState, store } from './redux/store'

function App() {
  
  return (
  <Provider store={store}>
    <div className="flex">
      <Calendars />
    </div>
      
  </Provider>
  )
}

export default App
