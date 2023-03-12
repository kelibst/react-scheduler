import { FC, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import UsersList from '../UsersList';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed shadow-md h-full bg-gray-100 text-black w-64 p-4 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'left-0' : '-left-64'
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold">Klight Solutions</h2>
        </div>
        <ul>
          <li>
            <a href="#" className="block font-bold p-2">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block font-bold p-2">
              Dashboard
            </a>
          </li>
          <UsersList />
        </ul>
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col relative w-full ${!sidebarOpen ? 'ml-0' : 'ml-64'}`}>
        {/* Top bar */}
        <div className="w-full flex bg-white shadow-md text-dark p-4">
          <button className={`relative shadow-md top-8 bg-white px-4 mx-3 rounded-2xl ${sidebarOpen ? "right-14": "right-4"}`} onClick={toggleSidebar}>
            {sidebarOpen ? (
              // <FaChevronLeft className="text-gray-400" />
              <div className='flex justify-center items-center'><FaChevronLeft /> <span className="ml-2">Hide</span> </div>
            ) : (
              // <FaChevronRight className="text-blue-400" />
              <div className='flex justify-center items-center'><FaChevronRight /> <span className="ml-2">Show</span></div>
            )}
          </button>
          <h2 className="text-lg font-bold">Duty Roaster Application</h2>
        </div>

        {/* Content */}
        <div className={`flex-1 p-4 ${!sidebarOpen ? 'w-full' : ''}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
