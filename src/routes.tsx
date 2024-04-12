import { lazy } from 'react';
import SearchResults from './pages/search-results/search-results';
import ProductForm from './components/product-form/product-form';

const ActivateAccount = lazy(() => import('./auth/activate-account'));
const ForgotPassword = lazy(() => import('./auth/forgot-password'));
const Login = lazy(() => import('./auth/login'));
const ResetPassword = lazy(() => import('./auth/reset-password'));
const SellerSignUp = lazy(() => import('./auth/seller-sign-up'));
const Home = lazy(() => import('./pages/home/home'));
const CategoriesPage = lazy(() => import('./pages/categories-page/categories-page'));
const Productview = lazy(() => import('./pages/product-view/product-view'));
const UserStore = lazy(() => import('./pages/user-store/user-store'));
const SignUp = lazy(() => import('./auth/sign-up'));

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/seller-signUp',
        element: <SellerSignUp />,
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
        path: '/product/:id',
        element: <Productview />,
    },

    {
        path: '/products/:category',
        element: <CategoriesPage />,
    },

    {
        path: '/store/:store_name',
        element: <UserStore />,
    },

    {
       path: '/signup',
       element: <SignUp />,
    },

    {
        path: '/search-results',
        element: <SearchResults />,
    },

    {
        path: '/create-product',
        element: <ProductForm />
    },

    {
        path: '*',
        element: <h1>Not Found</h1>,
    },
];

export default routes;
