import { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import ActivateAccount from './auth/activate-account'
import ForgotPassword from './auth/forgot-password'
import Login from './auth/login'
import ResetPassword from './auth/reset-password'
import SignUp from './auth/seller-sign-up'
import ErrorBoundary from './components/error-boundary'
import Spinner from './constants/spinner'
import Home from './pages/home/home'
import Navbar from './components/navbar/navbar'
import { useSelector } from 'react-redux'
import Footer from './components/footer.tsx/footer'
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import Carousel from './components/banner/banner'

function App() {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  console.log(isLoggedin, 'isLoggedin')
  const isLoginOrSignUpPage = window.location.pathname === '/login' || window.location.pathname === '/sign-up' || window.location.pathname.includes('activate') || window.location.pathname === '/forgot-password' || window.location.pathname.includes('/reset-password') || window.location.pathname === '/seller-signUp';
  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className='w-full overflow-hidden'>
          <ToastContainer />
          <Navbar />
          <BrowserRouter>
            <Suspense fallback={<Spinner size={16} color="text-blue-500" />}>
              <Routes>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element}
                  />
                ))}
              </Routes>
            </Suspense>
          </BrowserRouter>
          {/* <Footer /> */}
          {!isLoginOrSignUpPage ? <Footer /> : null}
        </div>
      </ErrorBoundary>
    </>
  )
}

export default App
