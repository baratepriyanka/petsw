import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardAppCli from './pages/DashboardAppCli';
import AddClinic from './pages/AddClinic';
import ClinicManagement from './pages/ClinicManagement';
import CreateNewUserManagement from './pages/CreateNewUserManagement';
import EditUserManagment from './pages/EditUserManagment';
import UserManagement from './pages/UserManagement';
import EditClinicManagment from './pages/EditClinicManagment';
// ----------------------------------------------------------------------

export default function Routesadmin({suadmin}) {
 
  return useRoutes([

    {
      path: '/dashboard',element: <DashboardLayout />,
      
      children: [
        { path: 'app', element: <DashboardAppCli /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path:'AddClinic',element: <AddClinic />},
        { path:'ClinicManagement',element: <ClinicManagement />},
        { path:'UserManagement',element: <UserManagement />},
        { path:'CreateNewUserManagement',element: <CreateNewUserManagement />},
        { path:'EditClinicManagment/:clinicId',element: <EditClinicManagment />},
        { path:'EditUserManagment/:userManId',element: <EditUserManagment />},

        
      ],
    },

  

    {
      path: '/',
      element: <LogoOnlyLayout />,
      role: suadmin,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '/', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      
      ],
    },

  
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
