import { NavLink, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isAdmin)
  return (
    <div className="min-h-screen ">
      <button
        className="md:hidden p-3 bg-slate-800 text-white   hover:bg-gray-700 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>
      <div className="flex min-h-screen">
        <div
          className={`bg-slate-800 text-white  lg:w-1/4 p-6 
      ${isOpen ? "block" : "hidden"} md:block`}
        >
          <div>
            <ul className="space-y-3">
              <NavLink
                to="/dashboard/addBorder"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 bg-[#30364F] rounded-md shadow-lg"
                    : "block px-4 py-2 hover:bg-[#30364F] rounded-md transition duration-200"
                }
              >
                Add New Border
              </NavLink>
              <NavLink
                to="/dashboard/manageBorder"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 bg-[#30364F] rounded-md shadow-lg"
                    : "block px-4 py-2 hover:bg-[#30364F] rounded-md transition duration-200"
                }
              >
                Manage Border
              </NavLink>
              <NavLink
                to="/dashboard/manageUsers"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 bg-[#30364F] rounded-md shadow-lg"
                    : "block px-4 py-2 hover:bg-[#30364F] rounded-md transition duration-200"
                }
              >
                Manage Users
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 bg-[#30364F] rounded-md shadow-lg"
                    : "block px-4 py-2 hover:bg-[#30364F] rounded-md transition duration-200"
                }
              >
                Home
              </NavLink>
            </ul>
          </div>
        </div>
        {/* Content Area */}
        <div className="lg:w-3/4 bg-gray-100  lg:p-8 mx-auto w-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
