<<<<<<< Updated upstream
import { useState } from "react";
=======
import { useRef, useState } from "react";
>>>>>>> Stashed changes
import { Provider, useDispatch, useSelector } from "react-redux";
import './App.css'
import Calendars from "./components/Calendars";
import Home from "./components/Home";

import { RootState, store } from './redux/store'

function App() {
<<<<<<< Updated upstream
  
  return (
  <Provider store={store}>
   <Home />   
=======
  const monthtableRef = useRef(null);
  const weekRef = useRef(null)
  return (
  <Provider store={store}>
   <Home {...{monthtableRef, weekRef}}/>   
>>>>>>> Stashed changes
  </Provider>
  )
}

export default App
