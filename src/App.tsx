import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import './App.css'
import Calendars from "./components/Calendars";
import Home from "./components/Home";

import { RootState, store } from './redux/store'

function App() {
  
  return (
  <Provider store={store}>
   <Home />   
  </Provider>
  )
}

export default App
