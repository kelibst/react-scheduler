import { Provider } from "react-redux";
import './App.css'
import UsersList from "./components/UsersList";
import WeekDayCalendar from "./components/WeekDayCalendar";
import { store } from './redux/store'

function App() {
 
  return (
  <Provider store={store}>
      <WeekDayCalendar />
      <UsersList />
  </Provider>
    
  )
}

export default App
