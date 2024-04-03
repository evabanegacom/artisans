import { lazy } from 'react';

const ActivateAccount = lazy(() => import('./auth/activate-account'));
const ForgotPassword = lazy(() => import('./auth/forgot-password'));
const Login = lazy(() => import('./auth/login'));
const ResetPassword = lazy(() => import('./auth/reset-password'));
const SignUp = lazy(() => import('./auth/sign-up'));
const Home = lazy(() => import('./pages/home/home'));

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/activate',
        element: <ActivateAccount />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
    },
    {
        path: '*',
        element: <h1>Not Found</h1>,
    },
];

export default routes;
