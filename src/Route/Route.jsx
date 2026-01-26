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
import MonthlyMeals from '../pages/Dashoboard/MonthlyMeals/MonthlyMeals.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import MyMeals from '../pages/Dashoboard/MyMeals/MyMeals.jsx';


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
        element: <PrivateRoute><AddNewBorder/></PrivateRoute>
      }
      ,
      {
        path: "/dashboard/mealCalculation",
        element: <PrivateRoute><MealCalculation/></PrivateRoute>
      },
      {
        path: "/dashboard/manageBorder",
        element: <PrivateRoute><ManageBorder/></PrivateRoute>,
      },
      {
        path: "/dashboard/manageUsers",
        element: <PrivateRoute><ManageUsers/></PrivateRoute>
      },
      {
        path: "/dashboard/monthlyMeals",
        element: <PrivateRoute><MonthlyMeals/></PrivateRoute>
      },
      {
        path: "/dashboard/myMeals",
        element: <MyMeals/>
      }
    ]
  }
]);

export default Route