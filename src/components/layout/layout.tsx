import { FC, MutableRefObject, ReactNode, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMonth } from '../../redux/reducers/monthReducer';
import { RootState } from '../../redux/store';
import { genActiveMonth } from '../MonthCalendar';
import UsersList from '../UsersList';
import { traverseWeek } from '../WeekDayCalendar';
import Actions from './Actions';
import SelectField from './SelectField';

export interface LayoutProps {
  children: ReactNode;
  monthtableRef: MutableRefObject<null>;
  weekRef: MutableRefObject<null>
}

const Layout: FC<LayoutProps> = (props) => {
  const {children } = props
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Week');
  const dispatch = useDispatch()
  const { weekView } = useSelector((state: RootState) => state.notification)
  const { years, activeWeek, activeMonth } = useSelector((state: RootState) => state.month)
  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed bg-gray-100 shadow-md h-full text-black w-64 p-4 transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-64'
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold">Klight Solutions</h2>
        </div>
        <ul>
          <li>
            <a href="https://prmministries.org/" className="block font-bold p-2">
              Home
            </a>
          </li>
          <UsersList />
        </ul>
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col relative w-full ${!sidebarOpen ? 'ml-0' : 'ml-64'}`}>
        {/* Top bar */}
        <div className="w-full flex bg-white shadow-md text-dark p-4">
          <button className={`relative shadow-md top-8 bg-white px-4 mx-3 rounded-2xl ${sidebarOpen ? "right-14" : "right-4"}`} onClick={toggleSidebar}>
            {sidebarOpen ? (
              // <FaChevronLeft className="text-gray-400" />
              <div className='flex justify-center items-center'><FaChevronLeft /> <span className="ml-2">Hide</span> </div>
            ) : (
              // <FaChevronRight className="text-blue-400" />
              <div className='flex justify-center items-center'><FaChevronRight /> <span className="ml-2">Show</span></div>
            )}
          </button>
          <h2 className="text-lg font-bold relative right-14">Duty Roster Application</h2>
        </div>
        <div className='flex justify-between items-center md:px-4 md:py-8 shadow-md'>
          <div>
            <span className="font-bold">Schedule : <span className="text-blue-400"> <SelectField value={selectedOption} onChange={handleSelectChange} /></span></span>
          </div>
          <div className='flex justify-center items-center font-bold rounded-xl bg-gray-100 px-4 mx-2'>
            <button onClick={() => {
              if (!weekView) {
                const newactiveMonth = genActiveMonth(activeWeek.clone().subtract(1, 'month'), years, dispatch)
                newactiveMonth && newactiveMonth[0]?.length && dispatch(setActiveMonth(newactiveMonth))
                newactiveMonth && newactiveMonth[0]?.length && traverseWeek(activeWeek.subtract(1, 'month').startOf('week'), years, dispatch)
              }else {
                 traverseWeek(activeWeek.subtract(1, 'week'), years, dispatch)
              }
            }}><AiFillCaretLeft />
            </button>
            <span>{activeWeek.format('MMM')} - {activeWeek.format("YY")}</span>
            <button onClick={() => {
              if (!weekView) {
                const newactiveMonth = genActiveMonth(activeWeek.clone().add(1, 'month'), years, dispatch)                  
                newactiveMonth &&  newactiveMonth[3]?.length && dispatch(setActiveMonth(newactiveMonth))
                newactiveMonth && newactiveMonth[3]?.length && traverseWeek(activeWeek.add(1, 'month').startOf('week'), years, dispatch)
              }else {
               traverseWeek(activeWeek.add(1, 'week'), years, dispatch) 
              } 
            }}><AiFillCaretRight /> </button>
          </div>
          <Actions {...props}/>
        </div>
        {/* Content */}
        <div className={`flex-1 p-4 ${!sidebarOpen ? 'w-full' : ''}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
