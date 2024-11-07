import { RouteObject } from 'react-router-dom';
import { IconType } from 'react-icons';
import pages from './pages';

// Pages
// -- Auth
import AuthPage from '@/pages/auth';

// -- App
import CreditPage from '@/pages/credits';
import GuarantorPage from '@/pages/guarantors';
import CustomerPage from '@/pages/customers/main';
import CustomerDetailsPage from '@/pages/customers/details';

// -- Common
import NotFoundPage from '@/pages/404';

// Icons
import { LuShieldCheck } from 'react-icons/lu';
import { AiOutlineDollar } from 'react-icons/ai';
import { LuUsers } from 'react-icons/lu';

export const authRoutes: RouteObject[] = [
  {
    path: pages.auth,
    Component: AuthPage,
  },
];

export const appRoutes: (RouteObject & { label?: string; icon?: IconType; showInMenu: boolean })[] = [
  {
    label: 'Customers',
    path: pages.customers,
    Component: CustomerPage,
    icon: LuUsers,
    showInMenu: true,
  },
  {
    path: `${pages.customers}/:id`,
    showInMenu: false,
    Component: CustomerDetailsPage,
  },
  {
    label: 'Credits',
    path: pages.credits,
    Component: CreditPage,
    icon: AiOutlineDollar,
    showInMenu: true,
  },
  {
    label: 'Guarantors',
    path: pages.guarantors,
    Component: GuarantorPage,
    icon: LuShieldCheck,
    showInMenu: true,
  },
];

export const commonRoutes: RouteObject[] = [
  {
    path: '*',
    Component: NotFoundPage,
  },
];
