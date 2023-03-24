import { useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import './App.css'
import Calendars from "./components/Calendars";
import Home from "./components/Home";

import { RootState, store } from './redux/store'

function App() {
  const monthtableRef = useRef(null);
  const weekRef = useRef(null)
  return (
  <Provider store={store}>
   <Home {...{monthtableRef, weekRef}}/>   
  </Provider>
  )
}

export default App
