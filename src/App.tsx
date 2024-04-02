import { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ActivateAccount from './auth/activate-account'
import ForgotPassword from './auth/forgot-password'
import Login from './auth/login'
import ResetPassword from './auth/reset-password'
import SignUp from './auth/sign-up'
import ErrorBoundary from './components/error-boundary'
import Spinner from './constants/spinner'
import Home from './pages/home/home'
import Navbar from './components/navbar/navbar'
import { useSelector } from 'react-redux'
import Footer from './components/footer.tsx/footer'

function App() {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const isLoginOrSignUpPage = window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname.includes('activate') || window.location.pathname === '/forgot-password' || window.location.pathname.includes('/reset-password');
  return (
    <>
       <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='bg-gray-900 w-full overflow-hidden'>
        <ToastContainer />
            <Navbar />

        <BrowserRouter>
          <Suspense fallback={<Spinner size={16} color="text-blue-500" />}>
            <Routes>

              <Route path='/' element={<Home />} />
              {!isLoggedin && (
                <>
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/login' element={<Login />} />
                  
                </>
              )}
              {isLoggedin && (
                <>
                  <Route path='/' element={<Home />} />
                </>
              )}
              <Route path='/activate' element={<ActivateAccount />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<h1>Not Found</h1>} />
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
