import { RouteObject } from 'react-router-dom';

// Pages
// -- Auth
import AuthPage from '@/pages/auth';

// -- App
import CustomerPage from '@/pages/customers';
import CreditPage from '@/pages/credits';
import GuarantorPage from '@/pages/guarantors';
import pages from './pages';
import NotFoundPage from '@/pages/404';

export const authRoutes: RouteObject[] = [
  {
    path: pages.auth,
    Component: AuthPage,
  },
];

export const appRoutes: RouteObject[] = [
  {
    path: pages.customers,
    Component: CustomerPage,
  },
  {
    path: pages.credits,
    Component: CreditPage,
  },
  {
    path: pages.guarantors,
    Component: GuarantorPage,
  },
];

export const commonRoutes: RouteObject[] = [
  {
    path: '*',
    Component: NotFoundPage,
  },
];
