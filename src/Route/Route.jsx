import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Root from '../Root/Root.jsx';
import Dashboard from './Dashboard.jsx';
import ManageBorder from '../pages/Dashoboard/ManageBorder/ManageBorder.jsx';
import ManageUsers from '../pages/Dashoboard/ManageUsers/ManageUsers.jsx';
import MealCalculation from '../pages/Dashoboard/MealCalculation/MealCalculation.jsx';
import AddNewBorder from '../pages/Dashoboard/AddNewBorder/AddNewBorder.jsx';
import Login from '../components/Login/Login.jsx';
import Register from '../components/Register/Register.jsx';


const Route = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
        {
            path:"/",
            element: <Home></Home>
        },
        {
            path:"/login",
            element: <Login/>
        },
        {
            path:"/register",
            element: <Register/>
        },
        
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "/dashboard/addNewBorder",
        element: <AddNewBorder/>
      }
      ,
      {
        path: "/dashboard/mealCalculation",
        element: <MealCalculation/>
      },
      {
        path: "/dashboard/manageBorder",
        element: <ManageBorder/>
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers/>
      }
    ]
  }
]);

export default Route