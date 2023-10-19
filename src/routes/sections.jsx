import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const AssistantPage = lazy(() => import('src/pages/assistant'));
export const StaffPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ScannerPage = lazy(() => import('src/pages/scanner'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router({themeMode, setThemeMode}) {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: (
        <DashboardLayout themeMode={themeMode} setThemeMode={setThemeMode}>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { element: <IndexPage />, index: true }, // 如果不想登入的話, 就註解這裡
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'staff', element: <StaffPage /> },
        { path: 'scanner', element: <ScannerPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'assistant', element: <AssistantPage /> },
      ],
    },
    
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
