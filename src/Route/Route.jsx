import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Root from '../Root/Root.jsx';
import Dashboard from './Dashboard.jsx';
import ManageBorder from '../pages/Dashoboard/ManageBorder/ManageBorder.jsx';
import ManageUsers from '../pages/Dashoboard/ManageUsers/ManageUsers.jsx';

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
        {
            path:"/",
            element: <Home></Home>
        },
        
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      // {
      //   path: "/dashboard/addBorder",
      //   element: <AddBorder/>
      // },
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