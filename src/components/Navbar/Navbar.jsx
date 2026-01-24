import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate()

  const Links = (
    <>
      <Link
        to="/"
        className="relative py-1 px-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
      >
        Home
      </Link>
      <Link
        to="/dashboard/addNewBorder"
        className="relative py-1 px-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
      >
        Dashboard
      </Link>
    </>
  );

  const handleOut = () => {
    logOut()
    .then(()=>{
      alert("Logged out successfully");
      navigate("/");
    })
    .catch((error)=>{
      console.log("Error logging out:", error);
    });
      
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Meal Manager</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button onClick={handleOut} className="btn btn-ghost">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
