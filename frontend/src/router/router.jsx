import { createBrowserRouter } from 'react-router-dom';
import SingleBlog from '../pages/blogs/singleblog/SingleBlog.jsx';
import App from '../App';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/user/Login.jsx';
import Register from '../pages/user/Register.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import DashBoard from '../pages/admin/dashboard/DashBoard.jsx';
import Addpost from '../pages/admin/dashboard/Addpost.jsx';
import Managepost from '../pages/admin/dashboard/Managepost.jsx';
import Users from '../pages/admin/dashboard/Users.jsx';
import PrivateRouter from './PrivateRouter.jsx';
import UpdateBlog from '../pages/admin/UpdateBlog.jsx';

const router = createBrowserRouter([
    {
        path: '/',  
        element: <App/>,
        children : [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/blog/:title",
                element: <SingleBlog/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "dashboard",
                element:  <PrivateRouter><Dashboard/></PrivateRouter>,
                children: [
                    {
                    path: "",
                    element: <DashBoard/>
                },
                {
                    path: "add-new-post",
                    element: <Addpost/>
                },
                {
                    path: "ManageItems",
                    element: <Managepost/>
                },
                {
                    path: "users",
                    element: <Users/>
                },
                {
                    path: "update-items/:id",
                    element: <UpdateBlog/>
                },

            ]
                
            }

        ]
    },
]);

export default router;