import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Root from '../Root/Root.jsx';
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
]);

export default Route