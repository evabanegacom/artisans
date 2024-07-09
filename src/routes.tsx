import { lazy } from 'react';
import SearchResults from './pages/search-results/search-results';
import ProductForm from './components/product-form/product-form';
import path from 'path';

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
const EditProduct = lazy(() => import('./pages/product-view/edit-product'));
const EditProfile = lazy(() => import('./auth/edit-profile'));
const SupportPage = lazy(() => import('./pages/support-pages/support-page'));
const Preview = lazy(() => import('./components/print-on-demand/preview'));

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
        path: '/edit-product/:id',
        element: <EditProduct />
    },

    {
        path: '/profile/:id',
        element: <EditProfile />
    },

    {
        path: '/support',
        element: <SupportPage />
    },

    {
        path: '/preview',
        element: <Preview />
    },

    {
        path: '*',
        element: <h1>Not Found</h1>,
    },
];

export default routes;
