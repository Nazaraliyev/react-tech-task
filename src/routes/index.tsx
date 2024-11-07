import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { appRoutes, authRoutes, commonRoutes } from './constants/routes';
import Layout from '@/layout';
import ProtectedRouter from './components/protected';
import { route } from './constants/pages';

const Router = () => <RouterProvider router={router} />;

export default Router;

const router = createBrowserRouter([
  {
    path: route.auth,
    Component: Outlet,
    children: [...authRoutes, ...commonRoutes],
  },
  {
    path: route.app,
    element: <ProtectedRouter component={<Layout />} />,
    children: [...appRoutes, ...commonRoutes],
  },
]);
