import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import routes from './routes';  // Assuming you have a default export of routes
import ErrorBoundary from './components/error-boundary';
import Footer from './components/footer.tsx/footer';
import Navbar from './components/navbar/navbar';
import Spinner from './constants/spinner';

function App() {
  const isLoggedin = useSelector((state:any) => state.reducer.auth.isAuth);
  const location = useLocation(); 
  
  // Check for login or sign-up related pages
  const isLoginOrSignUpPage = ['/login', '/signup', '/activate', '/forgot-password', '/reset-password', '/seller-signUp']
    .some(path => location.pathname === path || location.pathname.includes(path));
  const variables = [
    {
      id: 1,
      name: 'Age(Numeric)',
      type: "Numeric"
    },

    {
      id: 2,
      name: 'Grade(Numeric)',
      type: "Numeric"
    },

    {
      id: 3,
      name: 'BMI(categorical)',
      type: "Categorical"
    },

    {
      id: 4,
      name: 'hours_of_study(Numeric)',
      type: "Numeric"
    },

    {
      id: 5,
      name: 'survey_details(String)',
      type: "String"
    },

  ]
  // npm run lint -- --fix

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='w-full overflow-hidden'>
        <ToastContainer />
        <Navbar />
          <Suspense fallback={<Spinner size={16} color="text-blue-500" />}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        {!isLoginOrSignUpPage && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
