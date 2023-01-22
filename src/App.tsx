import { Provider } from "react-redux";
import './App.css'
import { store } from './redux/store'

function App() {
 
  return (
  <Provider store={store}>
    <div className="text-2xl font-bold text-center">
     home
    </div>
  </Provider>
    
  )
}

export default App
