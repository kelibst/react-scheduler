import { Provider } from "react-redux";
import './App.css'
import WeekDayCalendar from "./components/WeekDayCalendar";
import { store } from './redux/store'

function App() {
 
  return (
  <Provider store={store}>
    <WeekDayCalendar />
  </Provider>
    
  )
}

export default App
